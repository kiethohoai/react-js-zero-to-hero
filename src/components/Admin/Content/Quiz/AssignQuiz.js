import { useState, useEffect } from "react";
import Select from "react-select";
import { getAllQuizForAdmin, getAllUsers } from "../../../../services/apiService";
import "./AssignQuiz.scss";

const AssignQuiz = (props) => {
  ////////// PROPS STATE ///////////
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    // Fetch Quiz
    fetchQuiz();
    // Fetch User
    fetchUser();
  }, []);

  // Fetch Quiz
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  // Fetch User
  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newQuiz);
    }
  };

  ////////// HANDLE ///////////

  ////////// RETURN ///////////
  return (
    <div className="assign-quiz-container">
      <div className="assign-quiz-content">
        {/* select quiz */}
        <div className="select-quiz">
          Select Quiz
          <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
        </div>

        {/* select user */}
        <div className="select-user">
          Select User
          <Select value={selectedUser} onChange={setSelectedUser} options={listUser} />
        </div>
      </div>

      {/* button assign */}
      <div>
        <button className="btn btn-warning mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
