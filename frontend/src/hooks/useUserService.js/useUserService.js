import { UserService } from "../../services/user-service/user-service";
import { getErrorMsg } from "../../utils/returnErrorMsg";
import { NotificationManager } from "react-notifications";

const userService = new UserService();

const useUserService = () => {
  const createUser = async (user) => {
    try {
      await userService.createUser(user);
      NotificationManager.success("Action completed");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  const updateUser = async (account, id) => {
    try {
      await userService.updateAccount(account, id);
      NotificationManager.success("Action completed");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  const deleteUser = async (id) => {
    try {
      await userService.deleteAccount(id);
      NotificationManager.success("Action completed");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  return {
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUserService;
