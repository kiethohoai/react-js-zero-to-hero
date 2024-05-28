import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = (props) => {
  let params = useParams();
  let quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log("🚀CHECK + file: DetailQuiz.js:15 + res:", res);
  };

  return (
    <>
      <h1>Detail Quiz</h1>
    </>
  );
};

export default DetailQuiz;
