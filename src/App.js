import "./App.scss";
import { Link } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <div>
        <h1>Testing Here</h1>

        <button>
          <Link to="/user">Go to User</Link>
        </button>
        <button>
          <Link to="/admin">Go to Admin</Link>
        </button>
      </div>
    </div>
  );
};

export default App;
