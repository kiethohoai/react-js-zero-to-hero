import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiFillMinusSquare } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";

const Questions = (props) => {
  // PROPS & STATE
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="q-container">
      {/* Title */}
      <div className="q-title">Manage Questions</div>

      {/* Select Quiz */}
      <div className="q-select-quiz">
        <label htmlFor="">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={options}
        />
      </div>

      {/* PART 3 */}
      <div>Add Questions:</div>
      <div className="q-add-del-question">
        {/* Add Questions */}
        <div className="q-add-questions">
          <label htmlFor="floatingInput" hidden>
            Add Questions:
          </label>
          <input
            type="type"
            className="form-control"
            id="floatingInput"
            placeholder="Description"
          />
        </div>

        {/* +Upload Image */}
        <div className="q-upload-image">
          <label htmlFor="upload-image">Upload Image: </label>
          <input type={"file"} id="upload-image" hidden />
          <span> myImage.png</span>
        </div>

        {/* +Increase & Decrease +/- */}
        <div className="q-increase-decrease">
          <span>
            <MdAddBox size={"1.5em"} />
          </span>
          <span>
            <AiFillMinusSquare size={"1.4em"} />
          </span>
        </div>
      </div>

      {/* PART 4 */}
      <div className="q-add-del-answers">
        {/* Checkbox */}
        <div>
          <input type="checkbox" />
        </div>

        {/* Add Answers */}
        <div className="q-add-questions">
          <input
            type="type"
            className="form-control"
            id="floatingInput"
            placeholder="Answers 1"
          />
        </div>

        {/* Increase & Decrease +/- */}
        <div className="q-increase-decrease">
          <span>
            <MdAddBox size={"1.5em"} />
          </span>
          <span>
            <AiFillMinusSquare size={"1.4em"} />
          </span>
        </div>
      </div>

      {/* End */}
    </div>
  );
};

export default Questions;
