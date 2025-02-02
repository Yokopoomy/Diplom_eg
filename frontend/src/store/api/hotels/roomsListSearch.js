export const roomsListSearch = async (objParams) => {
  const { offset, limit, hotelId } = objParams;
  const newParams = new URLSearchParams({});
  newParams.append("offset", offset);
  newParams.append("limit", limit);
  newParams.append("hotelid", hotelId);

  const roomsUrl =
    process.env.REACT_APP_BACK_URL +
    "/api/common/hotel-rooms/" +
    `?${newParams}`;

  console.log(roomsUrl);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const response = await fetch(roomsUrl, options);

  if (!response.ok) {
    console.log("ERR");
    throw new Error(response.statusText);
  } else {
    return await response.json();
  }
};
