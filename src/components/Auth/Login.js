import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "./../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  ///// props & state /////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigae = useNavigate();

  ///// handle /////
  //validateEmail
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleLogin = async () => {
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

    //Call API Submit
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigae("/");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const handleNavigateSignup = () => {
    navigae("/signup");
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => handleNavigateSignup()}>Sign up</button>
      </div>
      <div className="title col-2 mx-auto">Typeform</div>
      <div className="welcome col-2 mx-auto">Hello, who’s this?</div>
      <div className="content-form col-2 mx-auto">
        <div className="form-group ">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name=""
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group ">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name=""
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot Password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Log in
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

export default Login;