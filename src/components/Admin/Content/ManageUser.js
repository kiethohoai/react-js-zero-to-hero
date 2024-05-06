import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaUserPlus } from "react-icons/fa6";
import { useState } from "react";

const ManageUser = (props) => {
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModelCreateUser(true)}
          >
            <FaUserPlus size={"1.3em"} />
            Add New User
          </button>
        </div>

        <div className="table-users-container">
          Table of Users <br />
        </div>
        <ModalCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
