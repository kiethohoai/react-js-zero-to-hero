import { useState } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlash } from "react-icons/lia";
import { toast } from "react-toastify";
import { postChangeUserPassword } from "../../services/apiService";

const Password = (props) => {
  const { handleClose } = props;
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

  return (
    <>
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
              <span className="icon-new-password" onClick={() => handleShowHideNewPassword()}>
                <LiaEyeSolid />
              </span>
            ) : (
              <span className="icon-new-password" onClick={() => handleShowHideNewPassword()}>
                <LiaEyeSlash />
              </span>
            )}
          </div>
        </div>

        <div className="btn-submit-password">
          <button className="btn btn-outline-success" onClick={() => handleChangePassword()}>
            Change
          </button>
          <button className="btn btn-outline-danger" onClick={() => handleClose()}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Password;
