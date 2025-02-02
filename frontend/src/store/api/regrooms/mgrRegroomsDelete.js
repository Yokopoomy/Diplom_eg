export const mgrRegRoomsDelete = async (params) => {
  console.log("===== PARAM SAGA reservation Delete", params);
  const url =
    process.env.REACT_APP_BACK_URL + "/api/manager/reservations" + `/${params}`;
  console.log("API DELETE URL", url);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  try {
    const res = await fetch(url, options);
    console.log("API DELETE GOOG RES", res.json());
  } catch (e) {
    console.log("ERROR ADD Бронирования", e.massage);
  }
};
