import axios from "../utils/axiosCustomize";

const postCreateNewUser = (username, password, email, role, previewImage) => {
  //submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", previewImage);
  return axios.post("api/v1/participant", data);
};

export { postCreateNewUser };
