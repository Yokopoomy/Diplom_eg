export const getUsersFromRequests = async () => {
  // console.log(" === getUsersFromRequests ");
  const url =
    process.env.REACT_APP_BACK_URL + `/api/manager/support-requests-users`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("Ошибка в TRY getUsersFromRequests");
      return {
        errorStatus: response.status,
        errorStatusText: response.statusText,
      };
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.log("ERROR getUsersFromRequests", e.massage);

    return null;
  }
};
