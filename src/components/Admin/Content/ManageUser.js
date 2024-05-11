import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaUserPlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserWithPaginate,
} from "./../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDisplayUser from "./ModalDisplayUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDisplayUser, setShowModalDisplayUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setPageCount] = useState(0);
  const LIMIT_USER = 3;

  //Conponent Didmount
  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  //fetch Data and Get All Users
  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  // fetchListUsersWithPaginate
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
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

  // Handle Btn Delete User in ModalDeleteUser
  const handleBtnDeleteUser = (user) => {
    setShowModalDeleteUser(true);
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
          {/* <TableUser
            listUsers={listUsers}
            handleClickUpdateModal={handleClickUpdateModal}
            handleClickViewBtnDisplayUser={handleClickViewBtnDisplayUser}
            handleBtnDeleteUser={handleBtnDeleteUser}
          /> */}

          <TableUserPaginate
            listUsers={listUsers}
            handleClickUpdateModal={handleClickUpdateModal}
            handleClickViewBtnDisplayUser={handleClickViewBtnDisplayUser}
            handleBtnDeleteUser={handleBtnDeleteUser}
            pageCount={pageCount}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <ModalCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
