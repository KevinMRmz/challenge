import React from "react";
import AccountCard from "../../components/account-card/account-card";
import useFetch from "../../../../hooks/useFetch/useFetch";
import { AccountService } from "../../../../services/account-service/account-service";

const accountService = new AccountService();

const Account = () => {
  const { data } = useFetch(accountService.getAccounts);

  return (
    <div className="container">
      <div className="header mt-3">
        <h2 className="text-uppercase" style={{ letterSpacing: "5px" }}>
          Accounts
        </h2>
        <hr />
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {data.map((account) => (
          <AccountCard account={account} />
        ))}
      </div>
    </div>
  );
};

export default Account;
