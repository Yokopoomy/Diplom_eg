export const regRoomsAdd = async (params) => {
  console.log("===== PARAM SAGA reservation ADD", JSON.stringify(params));
  const url =
    process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_RESERVATION;
  console.log("API URL", url);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(params),
  };
  try {
    const res = await fetch(url, options);
    console.log("API GOOG RES", res.json());
  } catch (e) {
    console.log("ERROR ADD Бронирования", e.massage);
  }
};
