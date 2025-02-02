export const usersDelete = async (param) => {
  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_USERS +
    "/" +
    param;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("Not OK!!!");
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    return data;
  }
};
