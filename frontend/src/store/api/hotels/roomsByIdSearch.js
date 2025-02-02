export const roomsByIdSearch = async (param) => {
  console.log("===== API PARAM roomsByIdSearch", param);

  const url =
    process.env.REACT_APP_BACK_URL + `/api/admin/hotel-rooms/${param}`;

  console.log("url", url);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw data;
  } else {
    return data;
  }
};
