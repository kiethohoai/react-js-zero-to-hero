// import axios from "axios";
import axios from "./../ultils/axiosCustomize";

// Prepare Data, Call API, Save DATA to DB
const postCreateNewUser = (username, password, email, role, image) => {
  // Prepare Data, Call API, Save to DB
  const data = new FormData();
  data.append("username", username);
  data.append("password", password);
  data.append("email", email);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const putUpdateUser = (id, username, role, image) => {
  // Prepare Data, Call API, Save to DB
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

//Get All Users via DATA using API
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

//Delete User Via ID
const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};


const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

//Login API
const postLogin = (email, password) => {
  // return axios.post("api/v1/login", { email, password });
  return axios.post("api/v1/login", {
    email: email,
    password: password,
    delay: 4000,
  });
};

//Register API
const postRegister = (email, username, password) => {
  return axios.post("api/v1/register", { email, username, password });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

// getDataQuiz
const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
};
