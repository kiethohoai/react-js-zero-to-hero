import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "./../../../../services/apiService";
import { toast } from "react-toastify";

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
  const [image, setImage] = useState(null);

  // HANDLE UPLOAD IMAGE FILE
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
    console.log("🚀CHECK + file: ManageQuiz.js:28 + res:", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      {/* Title */}
      <div className="title">Manage Quizzes</div>
      <hr />

      {/* Add New */}
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
            </label>
            <input
              type="file"
              id="upload-image"
              className="form-control"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>

          <div className="mt-3">
            <button
              onClick={() => handleSubmitQuiz()}
              className="btn btn-warning"
            >
              Save
            </button>
          </div>
        </fieldset>
        {/* </form> */}
      </div>

      {/* Table */}
      <div className="list-detail">Table</div>
    </div>
  );
};

export default ManageQuiz;
