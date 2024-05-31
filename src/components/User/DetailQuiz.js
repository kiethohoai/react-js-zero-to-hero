import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";
import Question from "./Question";
import { postSubmitAnswersFinishQuiz } from "../../services/apiService";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) => {
  let params = useParams();
  let quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [indexQ, setIndexQ] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  // Show Info
  useEffect(() => {
    const fetchQuestions = async () => {
      let res = await getDataQuiz(quizId);
      if (res && res.EC === 0) {
        let description = "";
        let imageFile = null;
        let imageName = "";
        // let answers = [];
        let raw = res.DT;

        // Group the elements of Array based on `id` property
        // `key` is group's name (id), `value` is the array of objects
        let data = _.chain(raw)
          .groupBy("id")
          .map((value, key) => {
            let answers = [];
            value.forEach((item, index) => {
              if (index === 0) {
                description = item.description;
                imageFile = item.image;
              }
              item.answers.isSelected = false;
              answers.push(item.answers);
            });

            return {
              id: key,
              description,
              imageFile,
              imageName,
              answers,
            };
          })
          .value();
        setDataQuiz(data);
      }
    };
    fetchQuestions();
  }, [quizId]);



  const handleBtnPrev = () => {
    if (indexQ - 1 < 0) {
      return;
    }
    setIndexQ(indexQ - 1);
  };
  const handleBtnNext = () => {
    if (dataQuiz && dataQuiz.length > indexQ + 1) {
      setIndexQ(indexQ + 1);
    } else {
      return;
    }
  };

  const handleCheckbox = (answerId, questionId) => {
    // Clone
    let dataQuizClone = _.cloneDeep(dataQuiz);
    // q.id === questionId
    if (dataQuizClone && dataQuizClone.length > 0) {
      let question = dataQuizClone.find((q) => +q.id === +questionId);
      // a.id === answerId
      if (question.answers && question.answers.length > 0) {
        let aTemp = question.answers.map((a) => {
          if (+a.id === +answerId) {
            a.isSelected = !a.isSelected;
          }
          return a;
        });
        // Update question.answers
        question.answers = aTemp;
      }

      let index = dataQuizClone.findIndex((item) => +item.id === +questionId);
      if (index > -1) {
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
      }
    }
  };

  // handleFinishQuiz
  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answersTemp = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = +item.id;
        let userAnswerId = [];

        item.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });

        answersTemp.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answersTemp;
      // submit API
      let res = await postSubmitAnswersFinishQuiz(payload);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setDataModalResult({
          countTotal: res.DT.countTotal,
          countCorrect: res.DT.countCorrect,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        toast.error(res.EM);
      }
    }
  };

  return (
    <div className="detail-quiz-container">
      {/* Left Content */}
      <div className="left-content">
        <div className="q-title">Quiz 1 - {location?.state?.quizTitle}</div>

        {/* q-content - Question Component */}
        <Question
          data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQ] : []}
          indexQ={indexQ}
          setIndexQ={setIndexQ}
          handleCheckbox={handleCheckbox}
        />

        <div className="q-footer">
          <button onClick={() => handleBtnPrev()} className="btn btn-outline-warning">
            Prev
          </button>
          <button onClick={() => handleBtnNext()} className="btn btn-outline-success">
            Next
          </button>
          <button onClick={() => handleFinishQuiz()} className="btn btn-outline-danger">
            Finish
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-content">Cowndown & Select Quiz Number</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
