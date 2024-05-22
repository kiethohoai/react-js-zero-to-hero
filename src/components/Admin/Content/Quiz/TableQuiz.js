import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import UpdateQuizModal from "./UpdateQuizModal";
import DeleteQuizModal from "./DeleteQuizModal";

const TableQuiz = (props) => {
  // const [listQuiz, setListQuiz] = useState([]);
  const { listQuiz, setListQuiz } = props;
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(0);
  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
  const [currentQuizName, setCurrentQuizName] = useState("");

  // HANDLE
  useEffect(() => {
    fetchQuiz();
  }, []);

  // Fetch Quiz
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  // handleUpdateQuiz
  const handleUpdateQuiz = (quizId) => {
    setShowUpdateQuiz(true);
    setCurrentQuizId(quizId);
  };

  // handleBtnDeleteQuiz
  const handleBtnDeleteQuiz = (quizId, quizName) => {
    setShowDeleteQuiz(true);
    setCurrentQuizId(quizId);
    setCurrentQuizName(quizName);
  };

  return (
    <>
      <h4>
        <b>List Quizzes</b>
      </h4>
      <table className="table table-hover table-bordered mt-2 my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Desciption</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateQuiz(item.id)}
                      className="btn btn-warning mx-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleBtnDeleteQuiz(item.id, item.name)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <UpdateQuizModal
        show={showUpdateQuiz}
        setShow={setShowUpdateQuiz}
        currentQuizId={currentQuizId}
        fetchQuiz={fetchQuiz}
      />
      <DeleteQuizModal
        show={showDeleteQuiz}
        setShow={setShowDeleteQuiz}
        currentQuizId={currentQuizId}
        currentQuizName={currentQuizName}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;