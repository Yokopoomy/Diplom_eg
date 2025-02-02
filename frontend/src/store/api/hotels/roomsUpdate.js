export const roomsUpdate = async (id, formData) => {
  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_ROOMS +
    `/${id}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  };
  try {
    const res = await fetch(url, options);
    console.log("RES", res.json());
    console.log("Номер успешно изменён!");
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
  }
};
