import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaUserPlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "./../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDisplayUser from "./ModalDisplayUser";

const ManageUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDisplayUser, setShowModalDisplayUser] = useState(false);

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

  // Fix resetUpdateData
  const resetUpdateData = () => {
    setDataUpdate({});
  };

  // Handle Cick View Button in ModalDisplayUser
  const handleClickViewBtnDisplayUser = (user) => {
    // Check user maybe undefine?
    setDataUpdate(user);
    setShowModalDisplayUser(true);
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
            handleClickViewBtnDisplayUser={handleClickViewBtnDisplayUser}
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
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
        />

        <ModalDisplayUser
          show={showModalDisplayUser}
          setShow={setShowModalDisplayUser}
          resetUpdateData={resetUpdateData}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
