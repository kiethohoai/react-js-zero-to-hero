import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";
import Question from "./Question";

const DetailQuiz = (props) => {
  let params = useParams();
  let quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [indexQ, setIndexQ] = useState(0);

  // Show Info
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let quizDescription = "";
      let quizImageFile = null;
      let quizImageName = "";
      // let quizAnswers = [];
      let raw = res.DT;

      // Group the elements of Array based on `id` property
      // `key` is group's name (id), `value` is the array of objects
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let quizAnswers = [];
          value.forEach((item, index) => {
            if (index === 0) {
              quizDescription = item.description;
              quizImageFile = item.image;
            }
            quizAnswers.push(item.answers);
          });

          return {
            quizId: key,
            quizDescription,
            quizImageFile,
            quizImageName,
            quizAnswers,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };

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
        />

        <div className="q-footer">
          <button
            onClick={() => handleBtnPrev()}
            className="btn btn-outline-warning"
          >
            Prev
          </button>
          <button
            onClick={() => handleBtnNext()}
            className="btn btn-outline-success"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-content">Cowndown & Select Quiz Number</div>
    </div>
  );
};

export default DetailQuiz;
