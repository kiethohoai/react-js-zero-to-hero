import { useState } from "react";
import "./Login.scss";
const Login = (props) => {
  ///// props & state /////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  ///// handle /////
  const handleLogin = () => {
    alert("handleLogin");
  };

  return (
    <div className="login-container">
      <div className="header">Don't have an account yet?</div>
      <div className="title col-2 mx-auto">Typeform</div>
      <div className="welcome col-2 mx-auto">Hello, who’s this?</div>
      <div className="content-form col-2 mx-auto">
        <div className="form-group ">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name=""
            id=""
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
            id=""
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
      </div>
    </div>
  );
};

export default Login;
