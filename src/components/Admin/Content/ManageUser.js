import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaUserPlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "./../../../services/apiService";

const ManageUser = (props) => {
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  //Conponent Didmount
  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log("🚀 CHECK => res =", res);
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

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
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
