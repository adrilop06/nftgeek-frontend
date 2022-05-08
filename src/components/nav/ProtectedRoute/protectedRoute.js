import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({
    user,
    redirectPath = '/no-user',
    children,
  }) => {
    const state = useSelector(state => state.users)
    //get the userAuth from the user gettin by state
    const {userAuth} = state;
    if (!userAuth) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;