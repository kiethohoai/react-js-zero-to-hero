import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
  }

  return (
    <>
      {/* render */}
      {props.children}
    </>
  );
};

export default PrivateRoute;
