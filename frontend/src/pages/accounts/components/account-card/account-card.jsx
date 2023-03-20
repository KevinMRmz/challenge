import React, { useState } from "react";
import AccountModal from "./../account-modal/AccountModal";

const AccountCard = ({ account }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div class="card m-3" style={{ width: "30%" }}>
      <div class="card-header w-100">Account Name: {account.accountName}</div>
      <div class="card-body">
        <h5 class="card-title">Client Name: {account.clientName}</h5>
        <p class="card-text">
          Operation Manager Name: {account.operationManagerName}
        </p>
        <div className="w-100 d-flex justify-content-evenly">
          <button onClick={() => setModalShow(true)} class="btn btn-primary">
            Account Team
          </button>
        </div>
      </div>
      <AccountModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        account={account}
      />
    </div>
  );
};

export default AccountCard;
