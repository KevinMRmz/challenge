import React from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="d-flex justify-content-between w-100">
          <div>
            <Link to="/challenge/" className="navbar-brand mx-3 nav-link">
              Accounts
            </Link>
          </div>
          <div class="w-50">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-evenly w-100">
              <li class="nav-item">
                <Link
                  to="/challenge/accounts-managment"
                  className="nav-link navbar-brand active"
                >
                  Account management
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/challenge/users"
                  className="nav-link navbar-brand active"
                >
                  Users
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/challenge/logs"
                  className="nav-link navbar-brand active"
                >
                  Logged
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link
              to="/challenge/profile"
              className="navbar-brand mx-3 nav-link"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default Header;
