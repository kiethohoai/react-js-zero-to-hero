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


//Get All Users via DATA using API
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

export { postCreateNewUser, getAllUsers };
