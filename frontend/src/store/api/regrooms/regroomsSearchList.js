export const regRoomsSearchList = async (params) => {
  console.log("===== API PARAM reservation LIST", params);
  const search = `?userid=${params}`;
  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_RESERVATION +
    search;
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
    console.log("API GOOG RES", data);
    return data;
  } catch (e) {
    console.log("API ERROR regRoomsSearchList Бронирования", e.massage);
  }
};
