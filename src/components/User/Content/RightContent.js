import CownDown from "./CountDown";
import "./RightContent.scss";

const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz } = props;
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
              <div key={`qabc-${index}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
