import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizById } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, curQuizData, fetchListQuiz } = props;
  const handleClose = () => setShow(false);

  if (!curQuizData) {
    return;
  }

  //handleBtnDeleteQuiz
  const handleBtnDeleteQuiz = async () => {
    let res = await deleteQuizById(curQuizData.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchListQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Current Quiz ID: {curQuizData.id} <br />
          Quiz Name: {curQuizData.name} <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleBtnDeleteQuiz()}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
