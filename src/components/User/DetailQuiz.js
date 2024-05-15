import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = (props) => {
  let params = useParams();
  const quizId = params.id;
  console.log("🚀 CHECK => params =", params);
  console.log("🚀 CHECK => quizId =", quizId);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log("🚀 CHECK => res =", res);
  };

  return <div className="detail-quiz-container">Detail Quiz</div>;
};

export default DetailQuiz;
