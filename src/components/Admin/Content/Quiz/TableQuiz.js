import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import UpdateQuizModal from "./UpdateQuizModal";


const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(0);

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

  return (
    <>
      <div>List Quizzes</div>
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
                    <button className="btn btn-danger">Delete</button>
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
      />
    </>
  );
};

export default TableQuiz;
