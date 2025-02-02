import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserError, actUserLogin } from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import WinError from "../Error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStyle, setEmailStyle] = useState({});
  const { user, userError } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

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
    dispatch(actUserLogin({ email, password }));
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
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
      <div className="mainpage">
        <div className="home flex-col">
          <div className="cl-black">
            <h1 className="title-login">Войдите в систему</h1>
          </div>
          <form className="flex-col" onSubmit={handleSubmit}>
            <div className="pol">
              <span className="input-span">Email</span>
              <input
                className="login-input"
                style={emailStyle}
                type="email"
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
            <button type="submit" className="form-button">
              Войти
            </button>
          </form>
          <div className="test-logins">
            <span>Тестовые данные для входа</span>
            <span className="input-span">Администратор - admin@mail.ru</span>
            <span className="input-span">Менеджер - manager@mail.ru</span>
            <span className="input-span">Клиент - client@mail.ru</span>
          </div>
        </div>
      </div>
    </>
  );
}