import React from "react";
import { useForm } from "react-hook-form";
import useAuthService from "../../../hooks/useAuthService/useAuthService";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuthService();

  return (
    <div className="w-100 vh-100 bg-primary justify-content-center d-flex align-items-center">
      <div className="container w-100">
        <div className="row justify-content-center d-flex align-items-center">
          <div className="col-sm-6 col-md-4">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit((data) =>
                    signIn(data.email, data.password)
                  )}
                >
                  <div className="form-group">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      className="form-control mt-2"
                      id="email"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="form-control mt-2"
                      id="password"
                      placeholder="Password"
                      {...register("password")}
                    />
                  </div>
                  <div className="d-flex w-100 justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3 w-50"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
