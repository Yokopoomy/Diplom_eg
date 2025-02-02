import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserError, actUserSignup } from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import WinError from "../Error";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailStyle, setEmailStyle] = useState({});
  const [role, setRole] = useState("client");
  const { user, userError } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userError && userError.type !== "err") clearFields();
  }, [userError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      dispatch(
        actUserError({
          statusCode: 400,
          message: "Неверный формат E-mail",
        })
      );
      return;
    }
    const body = { email, passwordHash: password, name, phone, role };
    dispatch(actUserSignup(body));
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkEmail = (e) => {
    const isValid = isValidEmail(e.target.value);
    setEmailStyle({
      border: `2px solid ${isValid ? "green" : "red"}`,
      outline: "none",
    });
    setEmail(e.target.value);
  };

  return (
    <>
      {userError && (
        <WinError type={userError.type} clearFields={clearFields}>
          {userError.text}
        </WinError>
      )}
      <main className="mainpage">
        <div className="home flex-col">
          <div className="cl-black">
            <h1 className="title-login">Регистрация</h1>
          </div>
          <form className="flex-col" onSubmit={handleSubmit}>
            <div className="pol">
              <span className="input-span">Email</span>
              <input
                className="login-input"
                type="email"
                style={emailStyle}
                value={email}
                onChange={checkEmail}
                required
              />
            </div>
            <div>
              <span className="input-span">Пароль</span>
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <span className="input-span">Имя</span>
              <input
                className="login-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <span className="input-span">Телефон</span>
              <input
                className="login-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            {user?.role === "admin" && (
              <div>
                <span className="input-span">Роль</span>
                <select
                  className="login-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="client">Клиент</option>
                  <option value="manager">Менеджер</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            )}
            <button type="submit" className="form-button" style={{ width: "250px" }}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </main>
    </>
  );
}