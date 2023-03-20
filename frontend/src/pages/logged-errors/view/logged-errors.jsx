import React from "react";
import LogCard from "../components/log-card/log-card";
import useFetch from "../../../hooks/useFetch/useFetch";
import axios from "axios";

const LoggedErrors = () => {
  const { data } = useFetch(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_URI + "/api/v1/movement"
    );
    return data;
  });

  return (
    <div className="container mt-3">
      <div className="header">
        <h3 style={{ borderBottom: "2px solid #000" }} className="p-3">
          Logged
        </h3>
      </div>
      <div className="mt-2">
        {data.map((log) => (
          <LogCard log={log} />
        ))}
      </div>
    </div>
  );
};

export default LoggedErrors;
