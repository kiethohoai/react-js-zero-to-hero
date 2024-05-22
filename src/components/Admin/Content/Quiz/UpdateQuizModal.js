import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UpdateQuizModal.scss";
import { MdFileUpload } from "react-icons/md";

const UpdateQuizModal = (props) => {
  // PROPS STATE
  const { show, setShow } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  // HANDLE
  const handleClose = () => setShow(false);

  // handleUpdateImage
  const handleUpdateImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePrev(URL.createObjectURL(e.target.files[0]));
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
              onChange={(e) => handleUpdateImage(e)}
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
          <Button variant="primary">Save & Update</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateQuizModal;
