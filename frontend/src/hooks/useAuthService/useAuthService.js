import { AuthService } from "../../services/auth-service/auth-service";
import { getErrorMsg } from "../../utils/returnErrorMsg";
import { NotificationManager } from "react-notifications";
import { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";

const authService = new AuthService();

const useAuthService = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    try {
      const { user, accessToken } = await authService.signIn(email, password);
      setUserInfo({ ...user, auth: true });
      window.sessionStorage.setItem("jwt", accessToken);

      if (user.role === "user") {
        console.log(user.role);
        return navigate("/user");
      }
      navigate("/challenge");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  const signOut = () => {};

  return {
    signIn,
    signOut,
  };
};

export default useAuthService;
