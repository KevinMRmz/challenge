import React, { useState } from "react";
import useAccountService from "../../../../hooks/useAccountService/useAccountService";
import UpdateAccountModal from "../form-modal/ModalUpdateForm";

const AccountCard = ({ account }) => {
  const { updateAccount, deleteAccount } = useAccountService();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div class="card m-2">
      <div class="card-header">Account Name: {account.accountName}</div>
      <div class="card-body">
        <p>Client Name: {account.clientName}</p>
        <div>
          <button
            class="btn btn-danger mx-3"
            onClick={() => deleteAccount(account.id)}
          >
            Delete Account
          </button>
          <button
            class="btn btn-primary text-white"
            onClick={() => setModalShow(true)}
          >
            Update Account
          </button>
        </div>
      </div>
      <UpdateAccountModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        account={account}
      />
    </div>
  );
};

export default AccountCard;
