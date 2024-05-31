import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { FaFileUpload } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./ModalUpdateQuiz.scss";
import _ from "lodash";
import { putUpdateAQuiz } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, curQuizData, fetchListQuiz } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState({});
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!_.isEmpty(curQuizData)) {
      setName(curQuizData.name);
      setDescription(curQuizData.description);
      setDifficulty({
        value: curQuizData.difficulty,
        label: curQuizData.difficulty,
      });

      // setImage & setImagePreview
      const convertBase64ToFile = async () => {
        let res = await urltoFile(
          `data:image/jpg;base64,${curQuizData.image}`,
          `image-${curQuizData.id}`,
          "image/jpg",
        );

        if (res) {
          setImage(res);
          setImagePreview(URL.createObjectURL(res));
        }
      };
      convertBase64ToFile();
    }
  }, [curQuizData]);

  // React Select options
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  // Convert Base64 to Object File in Javascripts
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  // handleClose
  const handleClose = () => {
    setShow(false);
  };

  // handleUploadImage
  const handleUploadImage = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // handleUpdateAQuiz
  const handleUpdateAQuiz = async () => {
    let res = await putUpdateAQuiz(curQuizData.id, name, description, difficulty?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchListQuiz();
      handleClose();
    } else {
      toast.success(res.EM);
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* name */}
          <div className="q-name mb-3">
            <label htmlFor="input-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="input-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* description */}
          <div className="q-description mb-3">
            <label htmlFor="input-description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="input-description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* difficulty */}
          <div className="q-difficulty mt-3">
            <label htmlFor="input-difficulty" className="form-label">
              Choose Difficulty
            </label>
            <Select value={difficulty} onChange={setDifficulty} options={options} />
          </div>

          {/* upload image */}
          <div className="q-upload-image mt-3">
            <label className="label-upload" htmlFor="upload-image">
              Upload Image
              <FaFileUpload size={"1.5em"} color={"red"} />
            </label>
            <input type="file" id="upload-image" onChange={(e) => handleUploadImage(e)} hidden />
            <label className="label-image-name">
              {image && image.name ? image.name : "0 File Upload"}
            </label>
          </div>

          {/* image preview */}
          <div className="q-image-preview">
            {imagePreview ? <img src={imagePreview} alt="" /> : <span>Preview Image</span>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleUpdateAQuiz()} variant="primary">
            Confirm & Update
          </Button>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
