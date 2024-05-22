import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizById } from "../../../../services/apiService";
import { toast } from "react-toastify";

const DeleteQuizModal = (props) => {
  const { show, setShow, currentQuizId, currentQuizName, fetchQuiz } = props;
  const handleClose = () => setShow(false);

  const handleConfirmDeleteQuiz = async () => {
    let res = await deleteQuizById(currentQuizId);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning! Delete This Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Quiz ID:</b> {currentQuizId} <br />
          <b>Quiz Name:</b> {currentQuizName}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleConfirmDeleteQuiz()} variant="primary">
            Confirm & Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQuizModal;
