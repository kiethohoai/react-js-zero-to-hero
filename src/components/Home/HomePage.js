import video from "../../assets/video-homepage.webm";
import "../Home/HomePage.scss";
// import { useSelector } from "react-redux";

const HomePage = () => {
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const account = useSelector((state) => state.user.account);
  return (
    <div className="homepage-container">
      <div className="home-content">
        <h1>Make forms worth filling out</h1>
        <p>
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </p>
        <button className="btn btn-dark">Get started—it's free</button>
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
