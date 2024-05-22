import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import {
  postCreateNewQuiz,
  getAllQuizForAdmin,
} from "./../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import { MdFileUpload } from "react-icons/md";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  // PROPS STATE
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [listQuiz, setListQuiz] = useState([]);

  // HANDLE UPLOAD IMAGE FILE
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePrev(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmitQuiz = async () => {
    // Validate
    if (!name) {
      toast.error("Name is required!");
      return;
    }

    if (!description) {
      toast.error("Description is required!");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage("");
      setImagePrev("");
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  // Fetch Quiz
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <b>CREATE A NEW QUIZ</b>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              {/* <form> */}
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name: </label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description:</label>
                </div>

                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type..."}
                  />
                </div>

                <div className="more-actions form-group">
                  <label className="mb-1" htmlFor="upload-image">
                    Upload Image
                    <MdFileUpload size={"1.7rem"} />
                  </label>
                  <input
                    type="file"
                    id="upload-image"
                    className="form-control"
                    onChange={(e) => handleChangeFile(e)}
                    hidden
                  />
                </div>

                {/* Image Preview */}
                {imagePrev ? (
                  <div className="image-preview">
                    <img src={imagePrev} alt="" />
                  </div>
                ) : (
                  <div className="image-preview">
                    <span>Image Preview</span>
                  </div>
                )}

                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-warning"
                  >
                    Save & Add New
                  </button>
                </div>
              </fieldset>
              {/* </form> */}
            </div>
            <hr />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Table */}
      <div className="list-detail">
        <TableQuiz listQuiz={listQuiz} setListQuiz={setListQuiz} />
      </div>
    </div>
  );
};

export default ManageQuiz;
