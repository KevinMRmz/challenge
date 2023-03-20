import AccountCard from "../components/account-card/AccountCard";
import React, { useState } from "react";
import AccountModal from "../components/form-modal/ModalForm";
import useFetch from "../../../hooks/useFetch/useFetch";
import { AccountService } from "../../../services/account-service/account-service";
const accountService = new AccountService();

const AccountManagment = () => {
  const [modalShow, setModalShow] = useState(false);
  const { data } = useFetch(accountService.getAccounts);

  return (
    <div>
      <div className="container mt-3">
        {data.map((account) => (
          <AccountCard account={account} />
        ))}
      </div>
      <div className="w-100 mt-3 d-flex justify-content-center">
        <button
          className="btn btn-success mb-5"
          onClick={() => setModalShow(true)}
        >
          + Create Account
        </button>
      </div>
      <AccountModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default AccountManagment;
