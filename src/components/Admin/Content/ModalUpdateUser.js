import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { putUpdateUser } from "./../../../services/apiService";
import _ from "lodash";

//ModalUpdateUser
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate, resetUpdateData } = props;
  console.log("🚀 CHECK => dataUpdate =", dataUpdate);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //useEffect()
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // Update State
      setUsername(dataUpdate.username);
      setEmail(dataUpdate.email);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  //handleClose
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("USER");
    setImage("");
    setPreviewImage("");

    // resetUpdateData
    resetUpdateData();
  };

  //handleUploadImage
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  };

  //handleSubmitCreateUser
  const handleSubmitCreateUser = async () => {
    // Prepare Data, Call API, Save to DB
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    // Notify client when create user success or not
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListUsers();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label
                htmlFor="upload-image-file"
                className="form-label form-label-upload"
              >
                <FaPlusCircle />
                Upload Image File
              </label>
              <input
                type="file"
                id="upload-image-file"
                hidden
                onChange={(e) => {
                  handleUploadImage(e);
                }}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
