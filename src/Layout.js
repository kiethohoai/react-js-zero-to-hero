import App from "./App";
import { Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Quiz/ManageQuiz";

const NotFound = () => {
  return (
    <div className="alert alert-warning" style={{ textAlign: "center" }}>
      <h1>404 Not Found</h1>
    </div>
  );
};

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<ListQuiz />} />
        </Route>
        <Route path="quiz/:id" element={<DetailQuiz />} />
        <Route path="admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
      <ToastContainer />
    </>
  );
};
export default Layout;
