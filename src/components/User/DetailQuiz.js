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
    console.log("🚀CHECK + file: DetailQuiz.js:15 + res:", res);

    if (res && res.EC === 0) {
      let raw = res.DT;

      //loash group by
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          console.log("🚀CHECK + file: DetailQuiz.js:27 + value:", value);
          console.log("🚀CHECK + file: DetailQuiz.js:27 + key:", key);

          let answers = [];
          let questionDescription = null;
          let image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
            console.log(
              "🚀CHECK + file: DetailQuiz.js:30 + item.answers",
              item.answers,
            );
          });

          return {
            questionId: key,
            answers: answers,
            questionDescription: questionDescription,
            image: image,
          };
        })
        .value();

      console.log("🚀CHECK + file: DetailQuiz.js:23 + data:", data);
    }
  };

  return (
    <>
      <h1>Detail Quiz</h1>
    </>
  );
};

export default DetailQuiz;
