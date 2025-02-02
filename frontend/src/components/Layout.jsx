import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import Chat from "./chats/Chat";

export default function Layout() {
  const { user } = useSelector((state) => state.crUser);

  return (
    <div className="page-container">
      <Header />
      {user?.role === "client" && <Chat />}
      <main className="main-container">
        <div className="left-nav">
          <ul className="nav-ul">
            <li>
              <Link className="nav-link" to="/hotels">
                Все гостиницы
              </Link>
            </li>
            {user && (
              <>
                {user.role === "manager" && (
                  <li>
                    <Link className="nav-link" to="/managerchat">
                      <span className="link-span">Чат</span>
                    </Link>
                  </li>
                )}
                {user.role === "admin" && (
                  <li>
                    <Link className="nav-link" to="addhotel">
                      Добавить гостиницу
                    </Link>
                  </li>
                )}
                {(user.role === "manager" || user.role === "admin") && (
                  <li>
                    <Link className="nav-link" to="/users">
                      Пользователи
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}