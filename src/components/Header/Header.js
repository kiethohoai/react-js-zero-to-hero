import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../Header/Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  ///////////////// props & state ////////////////
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isShowProfile, setIsShowProfile] = useState(false);

  ///////////////// handle ////////////////
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogOut = async () => {
    // email, refresh_token
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());

      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  // handleClickProfile
  const handleClickProfile = () => {
    setIsShowProfile(true);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className="navbar-brand" to="/">
            {t("header.logo")}
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                {t("header.home")}
              </NavLink>
              <NavLink className="nav-link" to="/user">
                {t("header.user")}
              </NavLink>
              <NavLink className="nav-link" to="/admin">
                {t("header.admin")}
              </NavLink>
            </Nav>

            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className="btn btn-light" onClick={() => handleLogin()}>
                    {t("header.login")}
                  </button>
                  <button className="btn btn-dark" onClick={() => handleSignup()}>
                    {t("header.signup")}
                  </button>
                </>
              ) : (
                <NavDropdown title={t("header.setting")} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleClickProfile()}>
                    {t("header.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {t("header.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Change Language */}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Component */}
      <Profile show={isShowProfile} setShow={setIsShowProfile} />
    </>
  );
};

export default Header;
