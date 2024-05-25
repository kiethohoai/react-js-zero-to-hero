import Select from "react-select";
import "./QuizQA.scss";
import { useEffect, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  /////////////////// PROPS STATE ////////////////////

  const initQuestion = [
    {
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
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  /////////////////// HANDLE ////////////////////
  useEffect(() => {
    fetchQuiz();
  }, []);

  // Fetch Quiz
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  // handlePreviewImage
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setIsPreviewImage(true);
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
    }
  };

  // handleAddRemoveQuestion
  const handleAddRemoveQuestion = (type, id) => {
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

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  // handleAddRemoveAnswer
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
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

  // handleOnChangeQuestionDescription
  const handleOnChangeQuestionDescription = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  // handleOnChangeUploadFile
  const handleOnChangeUploadFile = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  // handleCheckBoxAnswerQuestion
  const handleCAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(questionsClone);
    }
  };

  // handleSubmitQuestionForQuiz
  const handleSubmitQuestionForQuiz = async () => {
    console.log("🚀CHECK + file: Questions.js:82 + questions:", questions);
    console.log("🚀CHECK + file: Questions.js:169 + selectedQuiz:", selectedQuiz);

    // Validate Data
    // 1 validate quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please Choose A Quiz!");
      return;
    }

    // 2 validate answer
    questions.map((question) => {
      question.answers.map((a) => {});
    });

    let isValidAnswer = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }

    if (isValidAnswer === false) {
      toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    // 3 validate question
    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }

    if (isValidQ === false) {
      toast.error(`Not Empty Description for Question ${indexQ1 + 1}`);
      return;
    }

    // submit questions
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile,
      );

      // submit answers
      for (const answer of question.answers) {
        await Promise.all(
          question.answers.map(async (answer) => {
            await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
          }),
        );
      }
    }

    toast.success("Create Questions & Answers Successfully! ");
    setQuestions(initQuestion);
  }; // End handleSubmitQuestionForQuiz

  /////////////////// RETURN ////////////////////
  return (
    <div className="questions-container">
      {/* -------START------ */}

      {/* <div className="title">Manage Question</div>
      <hr /> */}

      {/* select quiz */}
      <div className="select-quiz">
        Select Quiz
        <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
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
                    onChange={(e) =>
                      handleOnChangeQuestionDescription("QUESTION", question.id, e.target.value)
                    }
                  />
                </div>

                <div className="upload-image">
                  <label htmlFor={`${question.id}`} className="form-label" style={{ color: "red" }}>
                    <RiFolderUploadFill size={"2em"} />
                  </label>
                  <input
                    onChange={(e) => handleOnChangeUploadFile(question.id, e)}
                    type="file"
                    id={`${question.id}`}
                    hidden
                  />
                  <span style={{ cursor: "pointer" }}>
                    {question.imageName ? (
                      <span onClick={() => handlePreviewImage(question.id)}>
                        {question.imageName}
                      </span>
                    ) : (
                      "0 file is uploaded"
                    )}
                  </span>
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
                      onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}
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
                        <input
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleCAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked,
                            )
                          }
                        />
                      </div>
                      <div className="input-answers">
                        <input
                          type="text"
                          className="form-control"
                          id="add-question"
                          placeholder={`Answer ${index + 1}`}
                          value={answer.description}
                          onChange={(e) =>
                            handleCAnswerQuestion("INPUT", answer.id, question.id, e.target.value)
                          }
                        />
                      </div>
                      <div className="btn-add-del">
                        <button
                          onClick={() => handleAddRemoveAnswer("ADD", question.id)}
                          className="btn btn-outline-success"
                        >
                          Add+
                        </button>
                        {question.answers.length > 1 && (
                          <button
                            onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}
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

      {questions && questions.length > 0 && (
        <div>
          <button onClick={() => handleSubmitQuestionForQuiz()} className="btn btn-warning mb-3">
            Save Question
          </button>
        </div>
      )}

      {isPreviewImage === true && (
        <Lightbox
          image={dataImagePreview.url}
          title={dataImagePreview.title}
          onClose={() => setIsPreviewImage(false)}
        ></Lightbox>
      )}
      {/* -------END------ */}
    </div>
  );
};

export default QuizQA;
