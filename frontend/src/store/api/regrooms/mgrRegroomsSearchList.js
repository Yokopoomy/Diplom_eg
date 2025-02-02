export const mgrRegRoomsSearchList = async (params) => {
  console.log("===== API MgrRegRoomsSearchList LIST", params);
  const search = `?userid=${params}`;
  const url =
    process.env.REACT_APP_BACK_URL + "/api/manager/reservations" + search;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("ERROR ADD Бронирования", e.massage);
  }
};
