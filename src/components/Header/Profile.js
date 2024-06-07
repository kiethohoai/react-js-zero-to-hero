import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Profile.scss";
import { store } from "../../redux/store";
import _ from "lodash";
import {
  postUpdateProfileUser,
  postChangeUserPassword,
  getHistory,
} from "../../services/apiService";
import { toast } from "react-toastify";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlash } from "react-icons/lia";
import { useSelector } from "react-redux";
import Select from "react-select";

const Profile = (props) => {
  const { show, setShow } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState({});
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isShowCurPassWord, setIsShowCurPassWord] = useState(false);
  const [isShowNewPassWord, setIsShowNewPassWord] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [key, setKey] = useState("history");
  const [dataHistory, setDataHistory] = useState([]);
  const account = useSelector((state) => state.user.account);
  const options = [
    { value: "USER", label: "USER" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  useEffect(() => {
    if (key === "update") {
      handleUpdateProfile();
    }

    if (key === "history") {
      handleTabHistory();
    }
  }, [key]);

  useEffect(() => {
    handleUpdateProfile();
  }, [account]);

  // handleShowHideCurPassword
  const handleShowHideCurPassword = () => {
    setIsShowCurPassWord(!isShowCurPassWord);
  };

  // handleShowHideNewPassword
  const handleShowHideNewPassword = () => {
    setIsShowNewPassWord(!isShowNewPassWord);
  };

  //handleClose
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setImage("");
    setPreviewImage("");
  };

  //handleUploadProfileImage
  const handleUploadProfileImage = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  //handleUpdateProfile
  const handleUpdateProfile = async () => {
    if (!_.isEmpty(account)) {
      setUsername(account.username);
      setEmail(account.email);
      setRole({ value: account.role, label: account.role });
      if (account.image) {
        let tempImage = await urltoFile(
          `data:image/jpg;base64,${account.image}`,
          `${account.username}-image`,
          "image/jpg",
        );
        setImage(tempImage);
        setPreviewImage(URL.createObjectURL(tempImage));
      }
    }
  };

  // Conver base64 to File Object JS
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  // handleBtnUpdateUser
  const handleBtnUpdateUser = async () => {
    let res = await postUpdateProfileUser(username, image);

    // handleClose();
    if (res && res.EC === 0) {
      store.getState().user.account.username = res.DT.username;
      let imageBase64 = await toBase64(image);
      store.getState().user.account.image = imageBase64;
      toast.success(res.EM);
      toast.success("Please Login Again To Apply These Changes!");
    } else {
      toast.error(res.EM);
    }
  };

  // toBase64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // handleChangePassword
  const handleChangePassword = async () => {
    // API
    let res = await postChangeUserPassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setCurrentPassword("");
      setNewPassword("");
    } else {
      toast.error(res.EM);
    }
  };

  const handleTabHistory = async () => {
    // alert("ME");
    let res = await getHistory();
    if (res && res.EC === 0) {
      setDataHistory(res.DT.data);
    }
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {/* UPDATE */}
            {/* username */}
            <Tab eventKey="update" title="Update Profile">
              <div className="p-username mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="p-email mb-3">
                <label htmlFor="input-email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>

              {/* Role */}
              <div className="p-role">
                <label>Role</label>
                <Select value={role} onChange={setRole} options={options} isDisabled />
              </div>

              {/* profile image */}
              <div className="p-image mb-3">
                <label>Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleUploadProfileImage(e)}
                />
              </div>

              <div className="p-preview">
                {previewImage ? <img src={previewImage} alt="" /> : <span>Image Preview</span>}
              </div>

              <div className="p-submit">
                <Button className="me-2" variant="primary" onClick={() => handleBtnUpdateUser()}>
                  Confrim & Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Tab>

            {/* PASSWORD */}
            <Tab eventKey="password" title="Update Password">
              <div className="password-container">
                {/* current password */}
                <div className="p-current-password row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="current-password" className="col-form-label">
                      Current Password:
                    </label>
                  </div>
                  <div className="input-password col-auto">
                    <input
                      type={isShowCurPassWord && isShowCurPassWord === true ? "text" : "password"}
                      id="current-password"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    {isShowCurPassWord && isShowCurPassWord === true ? (
                      <span className="icon-password" onClick={() => handleShowHideCurPassword()}>
                        <LiaEyeSolid />
                      </span>
                    ) : (
                      <span className="icon-password" onClick={() => handleShowHideCurPassword()}>
                        <LiaEyeSlash />
                      </span>
                    )}
                  </div>
                </div>

                {/* new password */}
                <div className="p-new-password row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="new-password" className="col-form-label">
                      New Password:
                    </label>
                  </div>
                  <div className="input-new-password col-auto">
                    <input
                      type={isShowNewPassWord && isShowNewPassWord === true ? "text" : "password"}
                      id="new-password"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    {isShowNewPassWord && isShowNewPassWord === true ? (
                      <span
                        className="icon-new-password"
                        onClick={() => handleShowHideNewPassword()}
                      >
                        <LiaEyeSolid />
                      </span>
                    ) : (
                      <span
                        className="icon-new-password"
                        onClick={() => handleShowHideNewPassword()}
                      >
                        <LiaEyeSlash />
                      </span>
                    )}
                  </div>
                </div>

                <div className="btn-submit-password">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleChangePassword()}
                  >
                    Change
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => handleClose()}>
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>

            {/* HISTORY */}
            <Tab eventKey="history" title="History">
              <table className="table table-striped table-borderless">
                <thead>
                  <tr>
                    <th className="text-center">Order</th>
                    <th className="text-center">Quiz History</th>

                    <th className="text-center">QuizId</th>
                    <th className="text-center">UserID</th>

                    <th className="text-center">Total Question</th>
                    <th className="text-center">Total Correct</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHistory &&
                    dataHistory.length > 0 &&
                    dataHistory.map((item, index) => {
                      return (
                        <tr key={`his-${index}`}>
                          <td className="text-center">{item.id}</td>
                          <td>
                            {item.quizHistory.id} - {item.quizHistory.name} <br />
                            {item.quizHistory.description}
                          </td>
                          <td className="text-center">{item.quiz_id}</td>
                          <td className="text-center">{item.participant_id}</td>

                          <td className="text-center">{item.total_questions}</td>
                          <td className="text-center">{item.total_correct}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
