import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AccountForm from "../account-form/AccountForm";
import React from "react";
import useAccountService from "../../../../hooks/useAccountService/useAccountService";

function UpdateAccountModal(props) {
  const { updateAccount } = useAccountService();

  const update = (data) => {
    updateAccount(data, props.account.id);
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
          Update Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AccountForm action={update}></AccountForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAccountModal;
