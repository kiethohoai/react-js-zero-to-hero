import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = (props) => {
  let params = useParams();
  const quizId = params.id;

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
            console.log("item answer", item.answers);
          });
          console.log("value", value, "key", key);
          return { questionId: key, answers, questionDecription, image };
        })
        .value();
      console.log("🚀 CHECK => data =", data);
    }
  };

  return <div className="detail-quiz-container">Detail Quiz</div>;
};

export default DetailQuiz;
