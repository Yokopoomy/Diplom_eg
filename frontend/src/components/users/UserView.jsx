import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserView() {
  const { users } = useSelector((state) => state.usersList);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const userItem = users.find((item) => item._id === id);
    if (userItem) setUser(userItem);
  }, [users, id]);

  return (
    <>
      {user && (
        <div className="user-view">
          <h1>Данные пользователя</h1>
          <div>
            <span className="bold">ID: </span>
            {user._id}
          </div>
          <div>
            <span className="bold">Имя: </span>
            {user.name}
          </div>
          <div>
            <span className="bold">Email: </span>
            {user.email}
          </div>
          <div>
            <span className="bold">Тел.: </span>
            {user.contactPhone}
          </div>
          <div>
            <span className="bold">Роль: </span>
            {user.role}
          </div>
        </div>
      )}
    </>
  );
}