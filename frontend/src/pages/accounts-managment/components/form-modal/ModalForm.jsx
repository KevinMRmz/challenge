import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AccountForm from "../account-form/AccountForm";
import React from "react";
import useAccountService from "../../../../hooks/useAccountService/useAccountService";

function AccountModal(props) {
  const { createAccount } = useAccountService();

  const create = (account) => {
    createAccount(account);
    props.data.push(account);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AccountForm action={create}></AccountForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AccountModal;
