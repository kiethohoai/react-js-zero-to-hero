import Select from "react-select";
import { FaFileUpload } from "react-icons/fa";
import "./Questions.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const image = false;

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Description question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  // handleAddRemoveQuestions
  const handleAddRemoveQuestions = (type, qId) => {
    // add
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }

    // remove
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== qId);
      setQuestions(questionsClone);
    }
  };

  // handleAddRemoveAnswers
  const handleAddRemoveAnswers = (type, aId, qId) => {
    // add
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    // remove
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== aId,
      );
      setQuestions(questionsClone);
    }
  };
  return (
    <div className="qs-container">
      <div className="qs-title">Manage Questions</div>

      <div className="qs-select">
        <div>
          <b>Select Quiz</b>
        </div>
        <Select
          // value={selectedOption}
          // onChange={this.handleChange}
          options={options}
        />
      </div>

      {/* add questions */}
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="qs-add-container">
              <label
                className="qs-label-questions form-label"
                htmlFor={`question-input-${index + 1}`}
              >
                <b>Add Questions: {index + 1}</b>
              </label>
              <div className="qs-add-questions">
                <div className="qs-imput-question">
                  <input
                    type="text"
                    className="form-control"
                    id={`question-input-${index + 1}`}
                    placeholder={`Question's description ${index + 1}`}
                    // value={question.description}
                  />
                </div>

                <div className="qs-add-remove">
                  <button
                    onClick={() => handleAddRemoveQuestions("ADD", "")}
                    className="btn btn-outline-success"
                  >
                    Add+
                  </button>

                  {questions && questions.length > 1 && (
                    <button
                      onClick={() => handleAddRemoveQuestions("REMOVE", question.id)}
                      className="btn btn-outline-danger"
                    >
                      Del+
                    </button>
                  )}
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
              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <div key={answer.id} className="qs-add-answers">
                      <div className="qs-input-answer input-group">
                        <div className="input-group-text">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Answer's description ${index + 1}`}
                        />
                      </div>

                      <div className="qs-addremove-answer">
                        <button
                          onClick={() => handleAddRemoveAnswers("ADD", answer.id, question.id)}
                          className="btn btn-outline-success"
                        >
                          Add+
                        </button>

                        {question.answers && question.answers.length > 1 && (
                          <button
                            onClick={() => handleAddRemoveAnswers("REMOVE", answer.id, question.id)}
                            className="btn btn-outline-danger"
                          >
                            Del-
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}

      {/* End Container */}
    </div>
  );
};

export default Questions;
