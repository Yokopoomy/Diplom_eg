import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  actRegRoomsClear,
  actRegRoomsList,
  actUserLogout,
} from "../store/actions/actionCreators";

export default function Header() {
  const { user } = useSelector((state) => state.crUser);
  const { addRegRooms } = useSelector((state) => state.regrooms);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.role === "client") {
      dispatch(actRegRoomsList(user._id));
    }
  }, [user, addRegRooms]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(actUserLogout());
    dispatch(actRegRoomsClear());
    navigate("/");
  };

  return (
    <header className="header-container">
      <Link className="logo-link" to="/">
        <div className="logo-img"></div>
      </Link>

      <div className="header-main">
        {user ? (
          <div className="header-user-wrap">
            {user.role === "client" && (
              <Link className="header-nav-link" to="/reservations">
                Бронирования
              </Link>
            )}
            <span className="header-user">{user.name}</span>
            <span className="header-nav-link" onClick={handleLogout}>
              Выйти
            </span>
          </div>
        ) : (
          <div className="header-user-wrap">
            <Link className="header-nav-link" to="/signup">
              <span>Регистрация</span>
            </Link>
            <Link
              className="header-nav-link"
              style={{ marginLeft: "10px" }}
              to="/signin"
            >
              <span>Войти</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}