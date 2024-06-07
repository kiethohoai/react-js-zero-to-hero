import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Profile.scss";
import { store } from "../../redux/store";
import _ from "lodash";
import { postUpdateProfileUser, postChangeUserPassword } from "../../services/apiService";
import { toast } from "react-toastify";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlash } from "react-icons/lia";

const Profile = (props) => {
  const { show, setShow } = props;
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isShowCurPassWord, setIsShowCurPassWord] = useState(false);
  const [isShowNewPassWord, setIsShowNewPassWord] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
    let data = store.getState();
    if (!_.isEmpty(data)) {
      let tempUsername = data?.user?.account?.username;
      let tempImage = data?.user?.account?.image;

      let resultImage = await urltoFile(
        `data:image/jpg;base64,${tempImage}`,
        `${tempUsername}-image`,
        "image/jpg",
      );

      setUsername(tempUsername);
      setImage(resultImage);
      setPreviewImage(URL.createObjectURL(resultImage));
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
    console.log("🚀CHECK  file: Profile.js:117  res =", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setCurrentPassword("");
      setNewPassword("");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Content */}
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
            onClick={() => handleUpdateProfile()}
          >
            {/* Update Profile */}
            <Tab eventKey="update" title="Update Profile">
              <div className="p-username mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="p-image mb-3">
                <label className="form-label">Profile Image</label>
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

            {/* Change Password */}
            <Tab eventKey="password" title="Change Password">
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

            {/* History */}
            <Tab eventKey="history" title="Test History">
              Tab content for Loooonger Tab
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
