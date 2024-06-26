import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGithub } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import sidebarBg from "./../../assets/bg2.jpg";
import "./../Admin/SideBar.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <DiReact size={"3em"} color="00bfff" />
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            ReactJS
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<MdDashboard />} suffix={<span className="badge red">New</span>}>
            {t("sidebar.dashboard")}
            <Link to="/admin" />
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            icon={<MdDashboard />}
            title={t("sidebar.feature")}
          >
            <MenuItem>
              {t("sidebar.muser")}
              <Link to="/admin/manage-user" />
            </MenuItem>
            <MenuItem>
              {t("sidebar.mquiz")}
              <Link to="/admin/manage-quiz" />
            </MenuItem>
            <MenuItem>
              {t("sidebar.mques")}
              <Link to="/admin/manage-questions" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="#!"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <FaGithub />
            <span
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {t("sidebar.home")}
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBar;
