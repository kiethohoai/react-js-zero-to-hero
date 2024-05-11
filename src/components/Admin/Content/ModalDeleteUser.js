import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "./../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const handleClose = () => setShow(false);
  const {
    show,
    setShow,
    dataUpdate,
    fetchListUsers,
    fetchListUsersWithPaginate,
  } = props;

  //   Handle Submit Delete User
  const handleSubmitDeleteUesr = async () => {
    let data = await deleteUser(dataUpdate.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      props.setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this (Email) account?{" "}
          <b>{dataUpdate && dataUpdate.email ? dataUpdate.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUesr()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
