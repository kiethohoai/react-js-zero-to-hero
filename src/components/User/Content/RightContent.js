import CownDown from "./CountDown";
import "./RightContentFix.scss";

const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz, indexQ, setIndexQ } = props;
  console.log("🚀CHECK  file: RightContent.js:6  dataQuiz =", dataQuiz);

  // getClassQuestion
  const getClassQuestion = (index, question) => {
    // console.log("🚀CHECK  file: RightContent.js:10  index, question =", index, question);
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);

      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (index, item) => {
    setIndexQ(index);
  };

  return (
    <>
      <div className="main-timmer">
        <CownDown handleFinishQuiz={handleFinishQuiz} />
      </div>

      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`qabc-${index}`}
                className={getClassQuestion(index, item)}
                onClick={() => handleClickQuestion(index, item)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
