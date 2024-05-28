import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";

const ListQuiz = (props) => {
  const [listQ, setListQ] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let res = await getQuizByUser();
    if (res && res.EC === 0) {
      setListQ(res.DT);
    }

    console.log("🚀CHECK + file: ListQuiz.js:13 + res:", res);
  };

  return (
    <div className="quiz-container">
      {listQ &&
        listQ.length > 0 &&
        listQ.map((q, i) => {
          return (
            <div key={`quiz-${i}`} className="card" style={{ width: "18rem" }}>
              <img
                src={`data:image/jpg;base64,${q.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{`Quiz ${q.id}`}</h5>
                <p className="card-text">{q.description}</p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          );
        })}

      {listQ && listQ.length === 0 && <div>You Don't Have Any Quiz</div>}
    </div>
  );
};

export default ListQuiz;
