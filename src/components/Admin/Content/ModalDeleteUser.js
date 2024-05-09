import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeleteUser = (props) => {
  const handleClose = () => setShow(false);
  const { show, setShow, dataUpdate } = props;
  const handleSubmitDeleteUesr = () => {
    alert("handleSubmitDeleteUesr");
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
