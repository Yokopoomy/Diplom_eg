export const roomsAdd = async (formData) => {
  const url =
    process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_ROOMS;
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log("RES", data);
    // return data
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
    // return null
  }
};
