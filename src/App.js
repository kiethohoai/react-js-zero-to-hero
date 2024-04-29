import "./App.scss";
import Headers from "./components/Header/Header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Headers />
      <div>
        <h1>Test Links</h1>

        <button>
          <Link to="/user"> Go to User Page</Link>
        </button>
        <button>
          <Link to="/admin">Go to Admin Page</Link>
        </button>
      </div>
    </div>
  );
};

export default App;
