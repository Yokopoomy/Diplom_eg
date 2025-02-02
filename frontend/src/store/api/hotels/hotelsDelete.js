export const hotelsDelete = async (param) => {

  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_HOTELS +
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
    console.log("HOTELS delete Not OK!!!");
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    console.log("SAGA DELETE USER OK!!!", data);
    return data;
  }
};
