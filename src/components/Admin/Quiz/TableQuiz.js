import _ from "lodash";
import { useState } from "react";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {
  const { listQuiz, fetchListQuiz } = props;
  const [showModalUpdateQ, setShowModalUpdateQ] = useState(false);
  const [curQuizData, setCurQuizData] = useState({});

  if (_.isEmpty(listQuiz)) {
    return <></>;
  }

  const handleUpdateAQuiz = (quizData) => {
    setShowModalUpdateQ(true);
    setCurQuizData(quizData);
  };

  return (
    <>
      {/* List Quiz */}
      <div className="q-list mt-3 ms-2">
        <div style={{ fontSize: "24px", fontWeight: "600" }}>List Quiz</div>
        <div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listQuiz &&
                listQuiz.length > 0 &&
                listQuiz.map((item, index) => {
                  return (
                    <tr key={`q-${index}`}>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.difficulty}</td>
                      <td>
                        <button
                          onClick={() => handleUpdateAQuiz(item)}
                          className="btn btn-outline-success"
                        >
                          Update
                        </button>
                        <button className="btn btn-outline-danger ms-2">Delete</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalUpdateQuiz
        show={showModalUpdateQ}
        setShow={setShowModalUpdateQ}
        curQuizData={curQuizData}
        fetchListQuiz={fetchListQuiz}
      />
    </>
  );
};

export default TableQuiz;
