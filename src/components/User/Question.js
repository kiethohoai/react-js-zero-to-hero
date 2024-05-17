import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const HandleCheckBoxQ = (e, aId, qId) => {
    console.log("🚀CHECK + file: Question.js:5 + data:", data);
    console.log("🚀CHECK + file: Question.js:10 + aId, qId:", aId, qId);
    props.handleCheckbox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img src={`data:image/jpeg;base64, ${data.image}`} alt="" />
        </div>
      ) : (
        <div className="q-image"></div>
      )}

      <div className="question">
        Question {index + 1}: {data.questionDecription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    onClick={(e) => HandleCheckBoxQ(e, a.id, data.questionId)}
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    readOnly
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
