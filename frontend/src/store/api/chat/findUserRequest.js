export const findUserRequest = async (params) => {
  // console.log("===PAR=== findUserRequest id=", params);
  const newParams = new URLSearchParams({ id: params });

  const url =
    process.env.REACT_APP_BACK_URL +
    `/api/client/support-requests/?${newParams}`;

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
      console.log("Ошибка в TRY3");
      return {
        errorStatus: response.status,
        errorStatusText: response.statusText,
      };
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
    return null;
  }
};
