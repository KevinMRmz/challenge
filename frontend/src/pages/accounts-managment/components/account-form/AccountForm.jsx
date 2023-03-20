import React from "react";
import { useForm } from "react-hook-form";

const AccountForm = ({ action }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => action(data))}>
      <div className="form-group">
        <label>Account Name</label>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter the account name"
          {...register("accountName")}
        />
      </div>
      <div className="form-group mt-4">
        <label>Client Name</label>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter the client name"
          {...register("clientName")}
        />
      </div>
      <div className="form-group mt-4">
        <label>Operation Manager Name</label>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter the client name"
          {...register("operationManagerName")}
        />
      </div>
      <div className="d-flex w-100 justify-content-center">
        <button type="submit" className="btn btn-success btn-block mt-5 w-50">
          Send
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
