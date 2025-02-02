export const usersListSearch = async (params) => {
  const { offset, limit, search } = params;

  const newParams = new URLSearchParams({});
  newParams.append("offset", offset);
  newParams.append("limit", limit);
  newParams.append("search", search);

  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_USERS +
    `?${newParams}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("ERR");
    throw new Error(response.statusText);
  } else {

  }

  return await response.json();
};
