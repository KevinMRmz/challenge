import { useContext } from "react";
import Login from "../../pages/login/views/Login";
import Profile from "../../pages/profile/views/profile";
import { UserContext } from "../../context/user-context";
import UserHeader from "../header-normal-user/header-normal-user";

const Auth = ({ children, authorized }) => {
  const { user } = useContext(UserContext);

  if (!user.auth) {
    return <Login />;
  }

  if (!authorized.includes(user.role)) {
    return (
      <UserHeader>
        <Profile />
      </UserHeader>
    );
  }

  return children;
};

export default Auth;
