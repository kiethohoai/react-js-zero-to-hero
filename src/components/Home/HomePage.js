import video from "../../assets/video-homepage.webm";
import "../Home/HomePage.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 23P

  return (
    <div className="homepage-container">
      <div className="home-content">
        <h1>{t("homepage.title1")}</h1>

        <p>{t("homepage.title2")}</p>

        {isAuthenticated === true ? (
          <button onClick={() => navigate("/user")} className="btn btn-dark">
            {t("homepage.title4")}
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="btn btn-dark">
            {t("homepage.title3")}
          </button>
        )}
      </div>
      <div className="home-media">
        <video autoPlay loop muted>
          <source src={video} type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default HomePage;
