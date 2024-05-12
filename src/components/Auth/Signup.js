import { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "./../../services/apiService";
import { toast } from "react-toastify";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const Signup = (props) => {
  ///// props & state /////
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigae = useNavigate();

  ///// handle /////
  const handleNavigateLogin = () => {
    navigae("/login");
  };

  //validateEmail
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSubmitRegister = async () => {
    // Validate
    const isValidateEmail = validateEmail(email);
    if (!isValidateEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    //Call API Submit Register User
    let res = await postRegister(email, username, password);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigae("/login");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const handleHidePassword = () => {
    setIsShowPassword(false);
  };

  const handleShowPassword = () => {
    setIsShowPassword(true);
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Already have an account?</span>
        <button onClick={() => handleNavigateLogin()}>Log in</button>
      </div>
      <div className="title col-2 mx-auto">Typeform</div>
      <div className="welcome col-2 mx-auto">Create Account!</div>
      <div className="content-form col-2 mx-auto">
        <div className="form-group ">
          <label htmlFor="">Email (*)</label>
          <input
            type="email"
            name=""
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group ">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name=""
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group form-password">
          <label htmlFor="">Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            name=""
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-password-child">
            {isShowPassword ? (
              <span
                className="hide-password"
                onClick={() => handleHidePassword()}
              >
                <IoIosEye />
              </span>
            ) : (
              <span
                className="show-password"
                onClick={() => handleShowPassword()}
              >
                <IoIosEyeOff />
              </span>
            )}
          </div>
        </div>

        <span className="forgot-password">Forgot Password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleSubmitRegister()}>
            Register
          </button>
        </div>
        <div className="text-center back-homepage">
          <span
            onClick={() => {
              navigae("/");
            }}
          >
            &#60;&#60;Back to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
