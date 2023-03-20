export const getErrorMsg = (err) => {
  let result =
    err?.response?.data.message || "Something went wrong try agan later";

  if (Array.isArray(result)) {
    result = result.join(", \n");
  }

  return result;
};
