import UserModal from "../components/user-modal/user-modal";
import UserCard from "../components/user-card/user-card";
import { useState } from "react";
import { UserService } from "../../../services/user-service/user-service";
import useFetch from "../../../hooks/useFetch/useFetch";

const userService = new UserService();

const UserPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const { data } = useFetch(userService.getUsers);

  return (
    <div>
      <div className="container mt-3 d-flex flex-wrap justify-content-center ">
        <table class="table caption-top">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <UserCard user={user}></UserCard>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-100 mt-3 d-flex justify-content-center">
        <button
          className="btn btn-success mb-3"
          onClick={() => setModalShow(true)}
        >
          + Create User
        </button>
      </div>
      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={data}
      />
    </div>
  );
};

export default UserPage;
