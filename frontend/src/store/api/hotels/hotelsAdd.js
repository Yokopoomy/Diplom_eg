export const hotelsAdd = async (formData) => {
  const url =
    process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_HOTELS;
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  };
  try {
    const res = await fetch(url, options);
    console.log("res", res);
    alert("Гостиница успешно добавлена!");
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
  }
};
