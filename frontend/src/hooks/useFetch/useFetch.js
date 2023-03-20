import { useState, useEffect, useContext } from "react";

const useFetch = (fetchFunction) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFunction()
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  const filterDataById = (id) => {
    const newData = data.filter((element) => element._id !== id);
    setData(newData);
  };

  const addData = (info) => {
    const newData = data.push(info);
    setData(newData);
  };

  return { data, setData, filterDataById, addData };
};

export default useFetch;
