import Select from "react-select";
import { FaFileUpload } from "react-icons/fa";
import "./ManageQuiz.scss";
import { useState } from "react";

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
  const handleUploadImage = (e) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="q-container">
      {/* Quiz Title */}
      <div className="q-title">Manage Quiz</div>

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
            <input type="file" id="input-upload" hidden onChange={(e) => handleUploadImage(e)} />
            <label className="label-image-name">
              {image && image.name ? image.name : "0 File Upload"}
            </label>
          </div>

          {/* image preview */}
          <div className="q-image-preview">
            {imagePreview ? <img src={imagePreview} alt="no-image" /> : <span>Preview Image</span>}
          </div>
        </fieldset>
      </div>

      {/* List Quiz */}
      <div className="q-list mt-3">
        <div>List Quiz</div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageQuiz;

// State Hoa Data
