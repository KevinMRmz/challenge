import React from "react";

const UserHeader = () => {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{
        height: "60px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      }}
    >
      <div class="p-3">
        <h3 className="text-white">User Profile</h3>
      </div>
    </nav>
  );
};

export default UserHeader;
