import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useState } from "react";

const Question = (props) => {
  const { data, indexQ } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleOnChangeCheckBox = (aId, qId, value) => {
    props.handleCheckbox(aId, qId);
  };

  return (
    <>
      <div className="q-body">
        <img
          onClick={() => setIsPreviewImage(true)}
          className="q-body-image"
          src={`data:image/jpeg;base64,${data.imageFile}`}
          alt=""
        />
        {isPreviewImage && isPreviewImage === true && (
          <Lightbox
            image={`data:image/jpeg;base64,${data.imageFile}`}
            title={"View Image"}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
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
