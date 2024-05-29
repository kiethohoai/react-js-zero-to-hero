import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";

const DetailQuiz = (props) => {
  let params = useParams();
  let quizId = params.id;
  const location = useLocation();
  console.log("🚀CHECK + file: DetailQuiz.js:12 + location:", location);

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

      console.log("🚀CHECK + file: DetailQuiz.js:21 + data:", data);
    }
  };

  return (
    <div className="detail-quiz-container">
      {/* Left Content */}
      <div className="left-content">
        <div className="q-title">Quiz 1 - {location?.state?.quizTitle}</div>

        <div className="q-body">
          <img
            className="q-body-image"
            src={
              "https://cungcau.qltns.mediacdn.vn/thumb_w/830/421196537165905920/2022/11/15/edit-23483620238557462278653442744539141427549008n-2021-11-03-01-21-16685111322531772509746.jpeg"
            }
            alt="no-image"
          />
        </div>

        <div className="q-content">
          <div className="q-question">
            Question 1: Lorem ipsum dolor sit, amet consectetur adipisicing.
          </div>
          <div className="q-answer">
            <div>A. Lorem ipsum dolor sit amet.</div>
            <div>B. Lorem ipsum dolor sit amet.</div>
            <div>C. Lorem ipsum dolor sit amet.</div>
          </div>
        </div>

        <div className="q-footer">
          <button className="btn btn-outline-warning">Prev</button>
          <button className="btn btn-outline-success">Next</button>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-content">Cowndown & Select Quiz Number</div>
    </div>
  );
};

export default DetailQuiz;
