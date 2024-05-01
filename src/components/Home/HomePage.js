import videoHomePage from "../../assets/video-homepage.webm";
import Button from "react-bootstrap/Button";
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
          <Button className="btn-free" variant="secondary" size="lg">
            Get started - It's free!
          </Button>
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
