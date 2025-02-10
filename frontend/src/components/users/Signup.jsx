import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserError, actUserSignup } from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import WinError from "../Error";
import InputMask from "react-input-mask";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailStyle, setEmailStyle] = useState({});
  const [passwordStyle, setPasswordStyle] = useState({});
  const [phoneStyle, setPhoneStyle] = useState({});
  const [nameStyle, setNameStyle] = useState({});
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
    if (!isValidPassword(password)) {
      dispatch(
        actUserError({
          statusCode: 400,
          message: "Пароль должен содержать минимум 8 символов",
        })
      );
      return;
    }
    if (!isValidPhone(phone)) {
      dispatch(
        actUserError({
          statusCode: 400,
          message: "Неверный формат телефона",
        })
      );
      return;
    }
    if (!isValidName(name)) {
      dispatch(
        actUserError({
          statusCode: 400,
          message: "Минимум 3 символа, только буквы",
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

  // Проверка полей
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValidPhone = (phone) => {
    return /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone); 
  };

  const isValidName = (name) => {
    return /^[A-Za-zА-Яа-я]{3,}$/.test(name) && !/\d/.test(name) && !/[^A-Za-zА-Яа-я]/.test(name);
  };

  const checkEmail = (e) => {
    const isValid = isValidEmail(e.target.value);
    setEmailStyle({
      border: `2px solid ${isValid ? "green" : "red"}`,
      outline: "none",
    });
    setEmail(e.target.value);
  };

  const checkPassword = (e) => {
    const isValid = isValidPassword(e.target.value);
    setPasswordStyle({
      border: `2px solid ${isValid ? "green" : "red"}`,
      outline: "none",
    });
    setPassword(e.target.value);
  };

  const checkPhone = (e) => {
    const isValid = isValidPhone(e.target.value);
    setPhoneStyle({
      border: `2px solid ${isValid ? "green" : "red"}`,
      outline: "none",
    });
    setPhone(e.target.value);
  };

  const checkName = (e) => {
    const isValid = isValidName(e.target.value);
    setNameStyle({
      border: `2px solid ${isValid ? "green" : "red"}`,
      outline: "none",
    });
    setName(e.target.value);
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
                placeholder="example@domain.com"
                required
              />
            </div>
            <div>
              <span className="input-span">Пароль</span>
              <input
                className="login-input"
                type="password"
                style={passwordStyle}
                value={password}
                onChange={checkPassword}
                placeholder="От 8 символов"
                required
              />
            </div>
            <div>
              <span className="input-span">Имя</span>
              <input
                className="login-input"
                type="text"
                style={nameStyle}
                value={name}
                onChange={checkName}
                placeholder="От 3 символов, только буквы"
                required
              />
            </div>
            <div>
              <span className="input-span">Телефон</span>
              <InputMask
                className="login-input"
                style={phoneStyle}
                mask="+7(999)999-99-99"
                value={phone}
                onChange={checkPhone}
                placeholder="+7(___)___-__-__"
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