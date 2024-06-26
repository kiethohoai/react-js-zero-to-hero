import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuizToUser,
} from "../../../services/apiService";
import "./AssignQuiz.scss";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  // useEffect
  useEffect(() => {
    fetchListQuiz();
    fetchListUsers();
  }, []);

  // fetchListQuiz
  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.DT) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `ID: ${item.id} - Name: ${item.name} - ${item.difficulty}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  // fetchAllUsers
  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res && res.DT) {
      let newUser = res.DT.map((user) => {
        return {
          value: user.id,
          label: `ID: ${user.id} - Email: ${user.email} - Username: ${user.username}`,
        };
      });

      if (res && res.EC === 0) {
        setListUser(newUser);
      }
    }
  };

  // handleAssign
  const handleAssign = async () => {
    let res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setSelectedQuiz({});
      setSelectedUser({});
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="assign-container">
        <div className="assign-select-quiz">
          <label>Select Quiz</label>
          <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
        </div>

        <div className="assign-select-user">
          <label>Select User</label>
          <Select value={selectedUser} onChange={setSelectedUser} options={listUser} />
        </div>
      </div>

      <div className="assign-btn">
        <button onClick={() => handleAssign()} className="btn btn-warning">
          Assign To User
        </button>
      </div>
    </>
  );
};

export default AssignQuiz;
