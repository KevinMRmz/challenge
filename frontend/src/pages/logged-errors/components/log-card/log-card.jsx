import React from "react";

const LogCard = ({ log }) => {
  return (
    <span className="d-block p-2 bg-dark mb-2">
      <span className="text-primary">[Info]: {log.description}</span>
      <span className="text-white"></span>
    </span>
  );
};

export default LogCard;
