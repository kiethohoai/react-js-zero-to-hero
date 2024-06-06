import { useEffect, useState } from "react";
import CownDown from "./CountDown";
import "./RightContentFix.scss";

const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz, indexQ, setIndexQ } = props;

  useEffect(() => {
    //
  }, [indexQ]);

  // getClassQuestion
  const getClassQuestion = (index, question) => {
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      // let isClicked =

      if (isAnswered) {
        return "question selected";
      }
    }

    return "question";
  };

  // handleClickQuestion
  const handleClickQuestion = (index, curQuestion, e) => {
    // Index Question
    setIndexQ(index);

    // 1 xoa class clicked truoc do

    const temp2 = document.querySelector(".question.selected.clicked");
    if (temp2 !== null) {
      temp2.classList = "question selected";
    }

    const temp1 = document.querySelector(".question.clicked");
    if (temp1 !== null) {
      temp1.classList = "question";
    }
    let temp3 = e.target.classList;

    if (temp3.value === "question") {
      e.target.classList = "question clicked";
    }

    if (temp3.value === "question selected") {
      e.target.classList = "question selected clicked";
    }
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
                onClick={(e) => handleClickQuestion(index, item, e)}
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
