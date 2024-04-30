import "./App.scss";
import Headers from "./components/Header/Header";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      {/* Part 1 */}
      <div className="header-container">
        <Headers />
      </div>

      {/* Part 2 */}
      <div className="main-container">
        <div className="sidenav-container"></div>
      </div>

      {/* Part 3 */}
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
