import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult, setIsShowAnswers } = props;
  const handleClose = () => setShow(false);

  const handleShowAnswers = () => {
    setIsShowAnswers(true);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Question: {dataModalResult.countTotal}</div>
          <div>Total Correct Answers: {dataModalResult.countCorrect}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleShowAnswers()}>
            Show Answers
          </Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
