import Select from "react-select";
import { FaFileUpload } from "react-icons/fa";
import "./Questions.scss";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const image = false;

  return (
    <div className="qs-container">
      <div className="qs-title">Manage Questions</div>

      <div className="qs-select">
        <div>Select Quiz</div>
        <Select
          // value={selectedOption}
          // onChange={this.handleChange}
          options={options}
        />
      </div>

      {/* add questions */}
      <label className="qs-label-questions form-label" htmlFor="exampleFormControlInput1">
        Add Questions:
      </label>
      <div className="qs-add-container">
        <div className="qs-add-questions">
          <div className="qs-imput-question">
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Question's description"
            />
          </div>

          <div className="qs-add-remove">
            <button className="btn btn-outline-success">Add+</button>
            <button className="btn btn-outline-danger">Del+</button>
          </div>

          <div className="qs-upload-image">
            <label className="label-upload" htmlFor="input-upload">
              <FaFileUpload size={"1.4em"} color={"red"} />
              Upload Image:
            </label>
            <input
              type="file"
              id="input-upload"
              hidden
              //   onChange={(e) => handleUploadImage(e)}
            />
            <label className="label-image-name">
              {image && image.name ? image.name : "0 File Upload"}
            </label>
          </div>
        </div>

        {/* add answers */}
        <div className="qs-add-answers">
          <div className="qs-input-answer input-group">
            <div className="input-group-text">
              <input type="checkbox" className="form-check-input" />
            </div>
            <input type="text" className="form-control" placeholder="Answer's description" />
          </div>

          <div className="qs-addremove-answer">
            <button className="btn btn-outline-success">Add+</button>
            <button className="btn btn-outline-danger">Del-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
