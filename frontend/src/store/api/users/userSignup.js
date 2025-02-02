export const userSignup = async (param) => {
  const url =
    process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_SIGNUP;

  console.log("=== URL SIGNUP ===", url);
  const { email, passwordHash, name, phone, role } = param;
  const body = { email, passwordHash, name, contactPhone: phone, role };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw data;
  } else {
    return data;
  }
};
