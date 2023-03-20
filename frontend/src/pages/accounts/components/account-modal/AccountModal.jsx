import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserService } from "../../../../services/user-service/user-service";
import useFetch from "../../../../hooks/useFetch/useFetch";
import React from "react";

const userService = new UserService();

function AccountModal(props) {
  const { data } = useFetch(() =>
    userService.getUsersForTeam(props.account.id)
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.account.accountName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Operation manager name:</h4>
        <p>{props.account.operationManagerName}</p>

        <h4>Participants:</h4>
        {data.length === 0 ? (
          <p className="text-danger">No participants yet</p>
        ) : (
          data.map((user) => <p className="my-1">{user.name}</p>)
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AccountModal;
