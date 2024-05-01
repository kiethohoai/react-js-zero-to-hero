import videoHomePage from "../../assets/video-homepage.webm";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <div className="home-media">
        <div className="home-content">
          <h1 className="home-title">Make forms worth filling out</h1>
          <p className="home-desc">
            Get more data—like signups, feedback, and anything else—with forms
            designed to be refreshingly different.
          </p>
        </div>
        <div className="home-video">
          <video autoPlay muted loop width="700" height="500">
            <source src={videoHomePage} type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
