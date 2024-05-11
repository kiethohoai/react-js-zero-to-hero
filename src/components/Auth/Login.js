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
  const handleLogin = async () => {
    // Validate

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

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
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
            Log in to Typeform
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
