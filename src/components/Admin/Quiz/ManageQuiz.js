import Select from "react-select";
import { FaFileUpload } from "react-icons/fa";
import "./ManageQuiz.scss";
import { useEffect, useState } from "react";
import { postCreateNewQuiz, getAllQuizForAdmin } from "../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";

const ManageQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  // const imagePreview = true;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState({ value: "EASY", label: "EASY" });
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.DT) {
      setListQuiz(res.DT);
    }
  };

  const handleUploadImage = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddNewQuiz = async () => {
    // Validate
    if (!name) {
      toast.error("Invalid Name.");
      return;
    }

    if (!description) {
      toast.error("Invalid Description.");
      return;
    }

    if (!image) {
      toast.error("Please Upload An Image!");
      return;
    }

    //  API Add New Quiz
    let res = await postCreateNewQuiz(description, name, difficulty?.value, image);

    // Notify
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setDifficulty({ value: "EASY", label: "EASY" });
      setImage("");
      setImagePreview("");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="q-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Quiz</Accordion.Header>
          <Accordion.Body>
            {/* Quiz Title */}
            {/* <div className="q-title">Manage Quiz</div> */}

            {/* Add Quiz */}
            <div className="q-add">
              <fieldset className="border p-2">
                <legend className="w-auto">Add New Quiz</legend>
                {/* name */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>

                {/* description */}
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingDescription"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingDescription">Description</label>
                </div>

                {/* difficulty */}
                <div className="mt-3">
                  <Select
                    defaultValue={difficulty}
                    onChange={setDifficulty}
                    options={options}
                    placeholder={"Choose the difficulty..."}
                  />
                </div>

                {/* upload image */}
                <div className="q-upload-image">
                  <label className="label-upload" htmlFor="input-upload">
                    Upload Image
                    <FaFileUpload size={"1.5em"} color={"red"} />
                  </label>
                  <input
                    type="file"
                    id="input-upload"
                    hidden
                    onChange={(e) => handleUploadImage(e)}
                  />
                  <label className="label-image-name">
                    {image && image.name ? image.name : "0 File Upload"}
                  </label>
                </div>

                {/* image preview */}
                <div className="q-image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="no-image" />
                  ) : (
                    <span>Preview Image</span>
                  )}
                </div>

                {/* button add new */}
                <div className="q-button-add mt-2">
                  <button onClick={handleAddNewQuiz} className="btn btn-success">
                    Confirm & Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* List Quiz */}
      <div className="q-list mt-3">
        <TableQuiz listQuiz={listQuiz} />
      </div>
    </div>
  );
};

export default ManageQuiz;

// State Hoa Data
