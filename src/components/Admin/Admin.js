import SideBar from "./SideBar";
import "../Admin/AdminFix.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Language from "../Header/Language";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <span
            className="admin-icon"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <FaBars />
          </span>

          <div className="admin-setting">
            {/* Switch Language */}
            <Language />

            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
