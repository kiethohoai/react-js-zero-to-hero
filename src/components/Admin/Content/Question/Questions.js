import Select from "react-select";
import "./QuestionsFix.scss";
import { useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";

const Questions = (props) => {
  // Props & State
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectQuiz, setSelectQuiz] = useState({});

  return (
    <div className="questions-container">
      <div className="title">Manage Question</div>
      <hr />

      {/* select quiz */}
      <div className="select-quiz">
        Select Quiz
        <Select value={selectQuiz} onChange={setSelectQuiz} options={options} />
      </div>

      {/* question content */}
      <div className="questions-content">
        <div>Add Question</div>
        {/* add questions */}
        <div className="add-questions">
          <div className="input-questions">
            <input type="text" class="form-control" id="add-question" placeholder="Description" />
          </div>

          <div>
            <label for="formFile" class="form-label">
              <RiFolderUploadFill size={"2em"} />
            </label>
            <input type="file" id="formFile" hidden />
            <span> 0 file is uploaded</span>
          </div>

          <div className="btn-container">
            <button className="btn btn-outline-success">Add</button>
            <button className="btn btn-outline-danger">Del</button>
          </div>
        </div>

        {/* add answers */}
        <div className="add-answers">
          <div>
            <input type="checkbox" name="" id="" />
          </div>
          <div class="input-answers">
            <input type="text" class="form-control" id="add-question" placeholder="Answer" />
          </div>
          <div className="btn-add-del">
            <button className="btn btn-outline-success">Add</button>
            <button className="btn btn-outline-danger">Del</button>
          </div>
        </div>
      </div>

      {/* End question-container */}
    </div>
  );
};

export default Questions;
