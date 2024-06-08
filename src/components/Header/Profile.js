import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Profile.scss";
import _ from "lodash";
import { useSelector } from "react-redux";
import Update from "./Update";
import Password from "./Password";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;
  const [key, setKey] = useState("history");
  const account = useSelector((state) => state.user.account);

  //handleClose
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {/* UPDATE */}
            <Tab eventKey="update" title="Update Profile">
              <Update handleClose={handleClose} account={account} />
            </Tab>

            {/* PASSWORD */}
            <Tab eventKey="password" title="Update Password">
              <Password handleClose={handleClose} />
            </Tab>

            {/* HISTORY */}
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
