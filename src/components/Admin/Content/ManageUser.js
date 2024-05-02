import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      {/* User Title */}
      <div className="user-title">Manage User</div>

      {/* Add New User */}
      <div className="user-content">
        <button>Add New User</button>
      </div>
      {/* Display Users */}
      <div>Table of users</div>

      <ModalCreateUser />
    </div>
  );
};

export default ManageUser;
