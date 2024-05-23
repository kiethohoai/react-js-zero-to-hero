import Select from "react-select";
import "./QuestionsFix.scss";
import { useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = (props) => {
  // Props & State
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectQuiz, setSelectQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
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

  // handleAddRemoveQuestion
  const handleAddRemoveQuestion = (type, id) => {
    console.log("🚀CHECK + file: Questions.js:56 + type, id:", type, id);
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
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  // handleAddRemoveAnswer
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    console.log("🚀CHECK + file: Questions.js:72 + type:", type);
    console.log("🚀CHECK + file: Questions.js:72 + questionId:", questionId);
    console.log("🚀CHECK + file: Questions.js:72 + answerId:", answerId);

    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId,
      );
      setQuestions(questionsClone);
    }
  };

  console.log("🚀CHECK + file: Questions.js:56 + questions:", questions);
  return (
    <div className="questions-container">
      {/* -------START------ */}

      <div className="title">Manage Question</div>
      <hr />

      {/* select quiz */}
      <div className="select-quiz">
        Select Quiz
        <Select value={selectQuiz} onChange={setSelectQuiz} options={options} />
      </div>

      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="questions-content">
              <div>
                <b>Add Question {index + 1}</b>
              </div>
              {/* add questions */}
              <div className="add-questions">
                <div className="input-questions">
                  <input
                    type="text"
                    className="form-control"
                    id="add-question"
                    placeholder={`Question's description ${index + 1}`}
                    value={question.description}
                  />
                </div>

                <div>
                  <label htmlFor="formFile" className="form-label">
                    <RiFolderUploadFill size={"2em"} />
                  </label>
                  <input type="file" id="formFile" hidden />
                  <span> 0 file is uploaded</span>
                </div>

                <div className="btn-container">
                  <button
                    onClick={() => handleAddRemoveQuestion("ADD", "")}
                    className="btn btn-outline-success"
                  >
                    Add+
                  </button>
                  {questions.length > 1 && (
                    <button
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                      className="btn btn-outline-danger"
                    >
                      Del-
                    </button>
                  )}
                </div>
              </div>

              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <div key={answer.id} className="add-answers">
                      {/* add answers */}
                      <div>
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className="input-answers">
                        <input
                          type="text"
                          className="form-control"
                          id="add-question"
                          placeholder={`Answer ${index + 1}`}
                          value={answer.description}
                        />
                      </div>
                      <div className="btn-add-del">
                        <button
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", question.id)
                          }
                          className="btn btn-outline-success"
                        >
                          Add+
                        </button>
                        {question.answers.length > 1 && (
                          <button
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id,
                              )
                            }
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

      {/* -------END------ */}
    </div>
  );
};

export default Questions;
