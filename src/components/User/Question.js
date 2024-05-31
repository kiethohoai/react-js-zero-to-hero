import _ from "lodash";

const Question = (props) => {
  const { data, indexQ } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleOnChangeCheckBox = (aId, qId, value) => {
    props.handleCheckbox(aId, qId);
  };

  return (
    <>
      <div className="q-body">
        <img className="q-body-image" src={`data:image/jpeg;base64,${data.imageFile}`} alt="" />
      </div>

      <div className="q-content">
        <div className="q-question">
          Question {indexQ + 1}: {data.description}
        </div>
        <div className="q-answer">
          {data.answers &&
            data.answers.length > 0 &&
            data.answers.map((a, index) => {
              return (
                <div key={`answer${index}`}>
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    onChange={(e) => handleOnChangeCheckBox(a.id, data.id, e.target.checked)}
                    checked={a.isSelected}
                  />
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
