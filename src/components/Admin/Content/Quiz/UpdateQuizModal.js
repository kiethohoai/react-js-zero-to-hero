import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UpdateQuizModal.scss";
import { MdFileUpload } from "react-icons/md";
import {
  getDetailQuizDataById,
  putUpdateDetailQuizData,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const UpdateQuizModal = (props) => {
  // PROPS STATE
  const { show, setShow, currentQuizId, fetchQuiz } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  useEffect(() => {
    fetchDetailDataQuiz();
  }, [currentQuizId]);

  // fetchDetailDataQuiz
  const fetchDetailDataQuiz = async () => {
    if (currentQuizId === 0) {
      return;
    }
    let res = await getDetailQuizDataById(currentQuizId);
    if (res && res.EC === 0) {
      setName(res.DT.name);
      setDescription(res.DT.description);
      setDifficulty(res.DT.difficulty);
      setImage(res.DT.image);
      if (res.DT.image) {
        setImagePrev(`data:image/jpeg;base64, ${res.DT.image}`);
      }
    }
  };

  // handleClose
  const handleClose = () => setShow(false);

  // handleUploadImage
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePrev(URL.createObjectURL(e.target.files[0]));
    }
  };

  // handleBtnUpdateQuizById
  const handleBtnUpdateQuizById = async () => {
    // Validate
    if (!name) {
      toast.error("Name is required!");
      return;
    }

    if (!description) {
      toast.error("Description is required!");
      return;
    }

    // Call API Submit Data
    let res = await putUpdateDetailQuizData(
      currentQuizId,
      description,
      name,
      difficulty,
      image,
    );

    // Notify & Re-render UI
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  // RENDER
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* name */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* description */}
          <div className="mb-3">
            <label htmlFor="input-desc" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="input-desc"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* difficulty */}
          <label htmlFor="input-desc" className="form-label">
            Difficulty
          </label>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>

          {/* imageQuiz */}
          <div className="image-upload">
            <label htmlFor="input-upload-file" className="form-label">
              Image
              <MdFileUpload size={"1.7rem"} />
            </label>
            <input
              type="file"
              className="form-control"
              id="input-upload-file"
              //   value={image}
              onChange={(e) => handleUploadImage(e)}
              hidden
            />
          </div>

          {imagePrev ? (
            <div className="image-preview">
              <img src={imagePrev} alt="" />
            </div>
          ) : (
            <div className="image-preview">
              <span>Image Preview</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleBtnUpdateQuizById()} variant="primary">
            Save & Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateQuizModal;
