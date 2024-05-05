import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        {/* Add new user */}
        <div>
          <button>Add New User</button>
        </div>

        {/* Show List Users */}
        <div>
          Table of Users <br />
        </div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
