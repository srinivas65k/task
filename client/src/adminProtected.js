import { Navigate } from "react-router-dom";
const AdminProtected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
export default AdminProtected;