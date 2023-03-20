import { AccountService } from "../../services/account-service/account-service";
import { getErrorMsg } from "../../utils/returnErrorMsg";
import { NotificationManager } from "react-notifications";

const accountService = new AccountService();

const useAccountService = () => {
  const createAccount = async (account) => {
    try {
      await accountService.createAccount(account);
      NotificationManager.success("Action completed");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  const updateAccount = async (account, id) => {
    try {
      await accountService.updateAccount(account, id);
      NotificationManager.success("Action completed");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  const deleteAccount = async (id) => {
    try {
      await accountService.deleteAccount(id);
      NotificationManager.success("Action completed");
    } catch (error) {
      NotificationManager.error(getErrorMsg(error), "Error");
    }
  };

  return {
    createAccount,
    updateAccount,
    deleteAccount,
  };
};

export default useAccountService;
