import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserForm from "../user-form/user-form";
import useUserService from "../../../../hooks/useUserService.js/useUserService";
import React from "react";

function UserModalUpdate(props) {
  const { updateUser } = useUserService();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm action={updateUser} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModalUpdate;
