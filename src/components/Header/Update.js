import { useEffect, useState } from "react";
import Select from "react-select";
import { store } from "../../redux/store";
import { toast } from "react-toastify";
import { postUpdateProfileUser } from "../../services/apiService";
import _ from "lodash";

const Update = (props) => {
  const { handleClose, account } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState({});
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const options = [
    { value: "USER", label: "USER" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  useEffect(() => {
    handleUpdateProfile();
  }, [account]);

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

  //handleUploadProfileImage
  const handleUploadProfileImage = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

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

  return (
    <>
      {/* username */}
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
        <input type="file" className="form-control" onChange={(e) => handleUploadProfileImage(e)} />
      </div>

      <div className="p-preview">
        {previewImage ? <img src={previewImage} alt="" /> : <span>Image Preview</span>}
      </div>

      <div className="p-submit">
        <button onClick={() => handleBtnUpdateUser()} className="btn1 btn btn-outline-primary">
          Update
        </button>
        <button onClick={handleClose} className="btn2 btn btn-outline-danger">
          Cancel
        </button>
      </div>
    </>
  );
};

export default Update;
