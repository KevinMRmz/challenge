import { useRoutes } from "react-router-dom";
import Login from "../pages/login/views/Login";
import Auth from "../components/auth/Auth";
import Account from "../pages/accounts/views/Accounts/Accounts";
import AccountManagment from "../pages/accounts-managment/view/AccountManagment";
import UserPage from "../pages/users/view/user-page";
import Profile from "../pages/profile/views/profile";
import Header from "../components/header/Header";
import LoggedErrors from "../pages/logged-errors/view/logged-errors";
import UserHeader from "../components/header-normal-user/header-normal-user";

const Router = () => {
  let router = useRoutes([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/challenge",
      element: (
        <Auth authorized={["admin", "super admin"]}>
          <Header></Header>
        </Auth>
      ),
      children: [
        {
          index: "/",
          element: <Account></Account>,
        },
        {
          path: "accounts-managment",
          element: <AccountManagment></AccountManagment>,
        },
        {
          path: "users",
          element: <UserPage></UserPage>,
        },
        {
          path: "profile",
          element: <Profile></Profile>,
        },
        {
          path: "logs",
          element: <LoggedErrors></LoggedErrors>,
        },
      ],
    },
    {
      path: "user",
      element: (
        <>
          <UserHeader></UserHeader>
          <Profile></Profile>
        </>
      ),
    },
  ]);

  return router;
};

export default Router;
