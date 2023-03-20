import React, { useState } from "react";
import UserModalUpdate from "../user-modal/user-update-modal";

const UserCard = ({ user }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <button class="btn btn-danger mx-3">Delete User</button>
        <button
          class="btn btn-primary text-white"
          onClick={() => setModalShow(true)}
        >
          Update User
        </button>
      </td>
      <UserModalUpdate show={modalShow} onHide={() => setModalShow(false)} />
    </tr>
  );
};

export default UserCard;
