import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actUsersUpdate } from "../../store/actions/actionCreators";

export default function UserEdit() {
  const { users } = useSelector((state) => state.usersList);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userItem = users.find((item) => item._id === id);
    if (userItem) {
      setUser(userItem);
      setName(userItem.name);
      setPhone(userItem.contactPhone);
      setRole(userItem.role);
    }
  }, [users, id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formObj = { id, name, contactPhone: phone, role };
    dispatch(actUsersUpdate(formObj));
    navigate("/users");
  };

  return (
    <>
      {user && (
        <div className="user-view">
          <h1>Редактирование данных пользователя</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <span className="edit-fields bold">ID: </span>
              {user._id}
            </div>
            <div>
              <span className="edit-fields bold">Имя: </span>
              <input
                className="user-edit-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <span className="edit-fields bold">Email: </span>
              {user.email}
            </div>
            <div>
              <span className="edit-fields bold">Тел.: </span>
              <input
                className="user-edit-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <span className="edit-fields bold">Роль: </span>
              <input
                className="user-edit-input"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-button user-edit-button">
              Сохранить
            </button>
          </form>
        </div>
      )}
    </>
  );
}