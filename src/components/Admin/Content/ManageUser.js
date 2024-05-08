import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaUserPlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "./../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  // dataUpdate for user update their information
  const [dataUpdate, setDataUpdate] = useState({});

  //Conponent Didmount
  useEffect(() => {
    fetchListUsers();
  }, []);

  //fetch Data and Get All Users
  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  //handleClickUpdateModal
  const handleClickUpdateModal = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
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
          <TableUser
            listUsers={listUsers}
            handleClickUpdateModal={handleClickUpdateModal}
          />
        </div>
        <ModalCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchListUsers={fetchListUsers}
        />

        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
