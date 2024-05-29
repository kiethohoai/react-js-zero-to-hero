import _ from "lodash";

const Question = (props) => {
  const { data, indexQ } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      <div className="q-body">
        <img
          className="q-body-image"
          src={`data:image/jpeg;base64,${data.quizImageFile}`}
          alt="no-question-image"
        />
      </div>

      <div className="q-content">
        <div className="q-question">
          Question {indexQ + 1}: {data.quizDescription}
        </div>
        <div className="q-answer">
          {data.quizAnswers &&
            data.quizAnswers.length > 0 &&
            data.quizAnswers.map((a, index) => {
              return (
                <div key={`answer${index}`}>
                  <input className="form-check-input me-2" type="checkbox" />
                  {a.description}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Question;
