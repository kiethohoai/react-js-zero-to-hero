import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = (props) => {
  let params = useParams();
  let quizId = params.id;

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
    <>
      <h1>Detail Quiz</h1>
    </>
  );
};

export default DetailQuiz;
