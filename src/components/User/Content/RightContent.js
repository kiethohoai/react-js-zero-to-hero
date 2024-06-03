import "./RightContent.scss";

const RightContent = (props) => {
  const { dataQuiz } = props;
  console.log("🚀CHECK  file: RightContent.js:5  dataQuiz =", dataQuiz);

  return (
    <>
      <div className="main-timmer">10:10</div>

      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <>
                <div className="question">{index + 1}</div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
