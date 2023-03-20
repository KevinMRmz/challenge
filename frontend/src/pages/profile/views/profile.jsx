import React, { useContext } from "react";
import { UserContext } from "../../../context/user-context";
import { redirect, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5" style={{ fontSize: "1.3rem" }}>
      <div className="row">
        <div className="col-6">
          <p
            className="fw-bold w-100"
            style={{ borderBottom: "2px solid #000" }}
          >
            Name:
          </p>
          <p>{user.name}</p>
        </div>
        <div className="col-6">
          <p className="fw-bold" style={{ borderBottom: "2px solid #000" }}>
            Email:
          </p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <p className="fw-bold" style={{ borderBottom: "2px solid #000" }}>
            English Level:
          </p>
          <p>{user.englishLevel || "No especified"}</p>
        </div>
        <div className="col-6">
          <p className="fw-bold" style={{ borderBottom: "2px solid #000" }}>
            Role:
          </p>
          <p>{user.role}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="fw-bold" style={{ borderBottom: "2px solid #000" }}>
            CV Link:
          </p>
          <p>{user.CVLink && "No especified"}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="fw-bold" style={{ borderBottom: "2px solid #000" }}>
            Technical Knowledge:
          </p>
          <p>{user.technicalKnowledge && "No especified"}</p>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-end">
        <button className="btn btn-danger w-25" onClick={() => navigate("/")}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
