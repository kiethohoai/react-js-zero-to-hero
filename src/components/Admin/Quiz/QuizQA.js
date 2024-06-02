import Select from "react-select";
import { FaFileUpload } from "react-icons/fa";
import "./QuizQA.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  getQuizWithQA,
  postUpsertWithQA,
} from "../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const [dataPreviewImage, setDataPreviewImage] = useState({
    image: "",
    title: "",
  });
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const initQuestions = [
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
  const [questions, setQuestions] = useState(initQuestions);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    if (!_.isEmpty(selectedQuiz)) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  // useEffect
  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    // convert base64 to File Object
    if (res && res.EC === 0) {
      let questionsClone = _.cloneDeep(res.DT.qa);
      questionsClone.forEach(async (question) => {
        if (question.imageFile) {
          question.imageFile = await urltoFile(
            `data:image/jpg;base64,${question.imageFile}`,
            `question-${question.id}`,
            "image/jpg",
          );
          question.imageName = `question-${question.id}`;
        }
        return question;
      });

      setQuestions(questionsClone);
    }
  };

  // fetchListQuiz
  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.DT) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  // Convert Base64 to File {}
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

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

  // handleQuestionDescription
  const handleQuestionDescription = (value, questionId, type) => {
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
  const handleOnChangeUploadFile = (e, qId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  // handleCheckboxAnswerQuestion
  const handleCheckboxAnswerQuestion = (type, aId, qId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
        if (answer.id === aId) {
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

  // handlePreviewImage
  const handlePreviewImage = (qId) => {
    setIsPreviewImage(true);
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qId);
    if (index > -1) {
      setDataPreviewImage({
        image: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
    }
  };

  // handleSubmitQuestionForQuiz
  const handleSubmitQuestionForQuiz = async () => {
    // validate listQuiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a quiz!");
      return;
    }

    // validate question
    let isValidQuestion = true;
    let indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion = i;
        break;
      }
    }

    if (isValidQuestion === false) {
      toast.error(`Not empty description at "Question ${indexQuestion + 1}"`);
      return;
    }

    // validate answer
    let isValidAnswer = true;
    let indexQ = 0;
    let indexA = 0;

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          indexA = j;
          isValidAnswer = false;
          break;
        }
      }

      indexQ = i;
      if (isValidAnswer === false) {
        break;
      }
    }

    if (isValidAnswer === false) {
      toast.error(`Not empty "Answer ${indexA + 1}" at "Question ${indexQ + 1}"`);
      return;
    }

    // submit question
    // for (let question of questions) {
    //   let questionTemp = await postCreateNewQuestionForQuiz(
    //     +selectedQuiz.value,
    //     question.description,
    //     question.imageFile,
    //   );

    //   // submit answer
    //   for (let answer of question.answers) {
    //     await postCreateNewAnswerForQuestion(
    //       answer.description,
    //       answer.isCorrect,
    //       questionTemp.DT.id,
    //     );
    //   }
    // }

    // API Update/Delete Question
    let questionsClone = _.cloneDeep(questions);
    // Convert (Image) File to Base64
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
      }
    }

    let res = await postUpsertWithQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });

    // return;
    if (res && res.EC === 0) {
      toast.success("Create Questions & Answers Successfully!");
      setQuestions(initQuestions);
      setSelectedQuiz({});
      // fetchQuizWithQA();
    }
  };

  // File => toBase64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <div className="qs-container">
      {/* <div className="qs-title">Manage Questions</div> */}

      <div className="qs-select">
        <div>
          <b>Select Quiz</b>
        </div>
        <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
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
                    value={question.description}
                    onChange={(e) =>
                      handleQuestionDescription(e.target.value, question.id, "QUESTION")
                    }
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
                  <label className="label-upload" htmlFor={`${question.id}`}>
                    <FaFileUpload size={"1.4em"} color={"red"} />
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id={`${question.id}`}
                    onChange={(e) => handleOnChangeUploadFile(e, question.id)}
                    hidden
                  />
                  <label className="label-image-name">
                    <span
                      onClick={() => handlePreviewImage(question.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {question.imageName ? question.imageName : "0 File Upload"}
                    </span>
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
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={answer.isCorrect}
                            onChange={(e) =>
                              handleCheckboxAnswerQuestion(
                                "CHECKBOX",
                                answer.id,
                                question.id,
                                e.target.checked,
                              )
                            }
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Answer's description ${index + 1}`}
                          value={answer.description}
                          onChange={(e) =>
                            handleCheckboxAnswerQuestion(
                              "INPUT",
                              answer.id,
                              question.id,
                              e.target.value,
                            )
                          }
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

      {questions && questions.length > 0 && (
        <div>
          <button onClick={() => handleSubmitQuestionForQuiz()} className="btn btn-outline-warning">
            Save Question
          </button>
        </div>
      )}

      {isPreviewImage && isPreviewImage === true && (
        <Lightbox
          image={dataPreviewImage.image}
          title={dataPreviewImage.title}
          onClose={() => setIsPreviewImage(false)}
        ></Lightbox>
      )}

      {/* End Container */}
    </div>
  );
};

export default QuizQA;
