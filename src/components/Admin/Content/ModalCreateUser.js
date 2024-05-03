import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
import { toast } from "react-toastify";

const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setUserName("");
    setPassword("");
    setEmail("");
    setRole("USER");
    setImage("");
  };

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  };

  // Validate Email Func
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSubmitCreateUser = async () => {
    //Validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email!");
      return;
    }

    if (!password) {
      toast.error("Invalid Password!");
      return;
    }

    //submit data
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", previewImage);
    let res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      data,
    );
    console.log("🚀 CHECK => res =", res);
    console.log("🚀 CHECK => res.data =", res.data);

    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
    }

    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  return (
    <>
      <Modal backdrop="static" size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-body__form row g-3">
            {/* Username */}
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                autoComplete="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                autoComplete="current-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                autoComplete="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Role */}
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Upload Image */}
            <div className="col-md-6 upload-image">
              <label
                htmlFor="upload-image__input"
                className="form-label upload-image__label"
              >
                <FcPlus />
                Upload Image File
              </label>
              <input
                type="file"
                hidden
                id="upload-image__input"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>

            {/* Image Preview */}
            <div className="col-md-6 image-preview">
              {previewImage ? (
                <img
                  className="image-preview__img"
                  src={previewImage}
                  // src="https://i3.ytimg.com/vi/u9vK5utTcxE/maxresdefault.jpg"
                />
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
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
