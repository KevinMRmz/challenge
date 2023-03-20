import React from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ action }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => action(data))}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter your name"
          {...register("name")}
        />
      </div>
      <div className="form-group mt-2">
        <label>Email</label>
        <input
          type="email"
          className="form-control mt-2"
          placeholder="Enter your email"
          {...register("email")}
        />
      </div>
      <div className="form-group mt-2">
        <label>Password</label>
        <input
          type="password"
          className="form-control mt-2"
          placeholder="Enter your password"
          {...register("password")}
        />
      </div>
      <div className="form-group mt-2">
        <label>Confirm password</label>
        <input
          type="password"
          className="form-control mt-2"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
      </div>
      <div className="form-group mt-2">
        <label>User role</label>
        <select class="form-select mt-2" {...register("role")}>
          <option selected>User's role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>CV Link</label>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="CV Link"
          {...register("CVLink")}
        />
      </div>
      <div className="form-group mt-2">
        <label>User's english level</label>
        <select class="form-select mt-2" {...register("englishLevel")}>
          <option selected>User's english level</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label>Technical Knowledge</label>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter the client name"
          {...register("technicalKnowledge")}
        />
      </div>
      <div className="d-flex w-100 justify-content-center">
        <button type="submit" className="btn btn-success btn-block mt-5 w-50">
          Create User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
