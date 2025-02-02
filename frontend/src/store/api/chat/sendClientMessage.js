export const sendClientMessage = async (params) => {
  const { id, body } = params;
  const url =
    process.env.REACT_APP_BACK_URL +
    `/api/common/support-requests/${id._id}/messages`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      console.log("Ошибка в TRY");
      return { errorStatus: res.status, errorStatusText: res.statusText };
    }
    return await res.json();
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
    return null;
  }
};
