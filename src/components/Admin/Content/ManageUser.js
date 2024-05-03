import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";


const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      {/* User Title */}
      <div className="user-title">
        Manage User
      </div>

      {/* Add New User */}
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add New User</button>
        </div>

        {/* Display Users */}
        <div className="table-users-container">
          Table of users
        </div>
      </div>

      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
      />
    </div>
  );
};



export default ManageUser;
