import "./FixDetailQuiz.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import Question from "./Question";
import { postSubmitQuiz } from "../../services/apiService";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) => {
  let params = useParams();
  const quizId = params.id;
  const location = useLocation();
  // Data Quesiton
  const [dataQuiz, setDataQuiz] = useState([]);

  // Current Question User Click
  const [index, setIndex] = useState(0);

  // state ModalResult.js
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);

    if (res && res.EC === 0) {
      let raw = res.DT;

      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDecription = null;
          let image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDecription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDecription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  // HANDLE PREV BUTTON
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  // HANDLE NEXT BUTTON
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  // HANDLE CHECKBOX
  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId,
    );
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          // item.isSelected = true;
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = b;
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId,
    );

    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  // handleFinishQuiz
  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      //logic
      dataQuiz.forEach((item) => {
        let questionId = +item.questionId;
        let userAnswerId = [];

        item.answers.forEach((an) => {
          if (an.isSelected === true) {
            userAnswerId.push(an.id);
          }
        });

        answers.push({ questionId: questionId, userAnswerId: userAnswerId });
      });
    }

    payload.answers = answers;
    let res = await postSubmitQuiz(payload);
    console.log("🚀CHECK + file: DetailQuiz.js + res:", res);
    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setIsShowModalResult(true);
    } else {
      console.log("Something Wrong?");
    }
  };

  // Render
  return (
    <div className="detail-quiz-container">
      {/* Left Content */}
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-content">
          {/* QUESTION COMPONENT*/}
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            handleCheckbox={handleCheckbox}
          />
        </div>
        <div className="footer">
          <button onClick={() => handlePrev()} className="btn btn-light">
            Prev
          </button>
          <button onClick={() => handleNext()} className="btn btn-danger">
            Next
          </button>

          <button
            onClick={() => handleFinishQuiz()}
            className="btn btn-success"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-content">Cown Down</div>

      {/* ModalResult.js */}
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
        setDataModalResult={setDataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
