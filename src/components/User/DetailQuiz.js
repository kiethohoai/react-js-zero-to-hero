import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";
import Question from "./Question";
import { postSubmitAnswersFinishQuiz, getDetailQuizById } from "../../services/apiService";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NavLink } from "react-router-dom";

const DetailQuiz = (props) => {
  let params = useParams();
  let quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [indexQ, setIndexQ] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [titleQuiz, setTitleQuiz] = useState("");
  const [isDisableFinish, setIsDisableFinish] = useState(false);
  const [isShowAnswers, setIsShowAnswers] = useState(false);

  useEffect(() => {
    fetchDetailQuiz();
  }, []);

  // fetDetailQuiz
  const fetchDetailQuiz = async () => {
    let res = await getDetailQuizById(quizId);
    if (res && res.EC === 0) {
      setTitleQuiz(res.DT.description);
    }
  };

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
              item.answers.isCorrected = false;
              answers.push(item.answers);
            });

            answers = _.orderBy(answers, ["id"], ["asc"]);

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

      setIsDisableFinish(true);
      // DOING SOMETHING HERE???????????????????????????????????????????????????????
      // 01
      let dataClone = _.cloneDeep(dataQuiz);
      let dataFinish = res.DT.quizData;

      // 02
      // 03
      for (let i = 0; i < dataClone.length; i++) {
        let question = dataFinish.find((item) => item.questionId === +dataClone[i].id);
        for (let j = 0; j < dataClone[i].answers.length; j++) {
          if (question.systemAnswers[0].id === dataClone[i].answers[j].id) {
            dataClone[i].answers[j].isCorrected = true;
          }
        }
      }
      // DOING SOMETHING WITH dataClone Update In Here
      setDataQuiz(dataClone);
    }
  };

  return (
    <>
      <div className="breadcrumb">
        <Breadcrumb>
          <NavLink className="nav-link" to="/">
            Home &gt;
          </NavLink>
          <NavLink className="nav-link" to="/user">
            User &gt;
          </NavLink>
          <Breadcrumb.Item active>Quiz {quizId}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="detail-quiz-container">
        {/* Left Content */}
        <div className="left-content">
          <div className="q-title">
            Quiz {quizId} - {titleQuiz}
          </div>

          {/* q-content - Question Component */}
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQ] : []}
            indexQ={indexQ}
            setIndexQ={setIndexQ}
            handleCheckbox={handleCheckbox}
            isDisableFinish={isDisableFinish}
            isShowAnswers={isShowAnswers}
          />

          <div className="q-footer">
            <button onClick={() => handleBtnPrev()} className="btn btn-outline-warning">
              Prev
            </button>
            <button onClick={() => handleBtnNext()} className="btn btn-outline-success">
              Next
            </button>
            <button
              onClick={() => handleFinishQuiz()}
              className="btn btn-outline-danger"
              disabled={isDisableFinish}
            >
              Finish
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            indexQ={indexQ}
            setIndexQ={setIndexQ}
          />
        </div>

        {/* Modal Result */}
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
          setIsShowAnswers={setIsShowAnswers}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
