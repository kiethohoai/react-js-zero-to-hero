import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";

const DetailQuiz = (props) => {
  let params = useParams();
  const quizId = params.id;
  const location = useLocation();
  console.log("🚀 CHECK => location =", location);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log("🚀 CHECK => res =", res);

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

            answers.push(item.answers);
            // console.log("item answer", item.answers);
          });
          // console.log("value", value, "key", key);
          return { questionId: key, answers, questionDecription, image };
        })
        .value();
      console.log("🚀 CHECK => data =", data);
    }
  };

  return (
    <div className="detail-quiz-container">
      {/* Left Content */}
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img src="" alt="no-image" />
        </div>
        <div className="q-content">
          <div className="question">Question 1: How are you doing?</div>
          <div className="answer">
            <div className="a-child">A - Lorem ipsum dolor sit amet.</div>
            <div className="a-child">B - Lorem ipsum dolor sit amet.</div>
            <div className="a-child">C - Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-light">Prev</button>
          <button className="btn btn-danger">Next</button>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-content">Cown Down</div>
    </div>
  );
};

export default DetailQuiz;
