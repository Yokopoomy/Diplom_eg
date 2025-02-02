import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actUsersDelete, actUsersList } from "../../store/actions/actionCreators";
import UsersItem from "./UsersItem";

export default function Users() {
  const { users, isDelete } = useSelector((state) => state.usersList);
  const { user } = useSelector((state) => state.crUser);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [allowedShown, setAllowedShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trueRoles = ["admin", "manager"];

  useEffect(() => {
    if (user && trueRoles.includes(user.role)) {
      setAllowedShown(true);
    }
  }, [user]);

  useEffect(() => {
    if (allowedShown) {
      findUsers();
    }
  }, [offset, limit, isDelete, allowedShown]);

  const findUsers = () => {
    const params = { offset, limit, search };
    dispatch(actUsersList(params));
  };

  const searchUsers = () => {
    setOffset(0);
    findUsers();
  };

  const handleAddUser = () => {
    navigate("/signup");
  };

  const handleIconClick = (event, item) => {
    const action = event.target?.alt;
    switch (action) {
      case "view":
        navigate(`/userview/${item._id}`);
        break;
      case "edit":
        navigate(`/useredit/${item._id}`);
        break;
      case "reserv":
        navigate(`/mgrresevations/${item._id}`, { state: { item } });
        break;
      case "delete":
        setOffset(0);
        dispatch(actUsersDelete(item._id));
        break;
      default:
        break;
    }
  };

  const handleChangeLimit = (event) => {
    setOffset(0);
    setLimit(Number(event.target.value));
  };

  const handleSetOffset = (type) => {
    setOffset((prevOffset) => (type === "incr" ? prevOffset + 1 : Math.max(prevOffset - 1, 0)));
  };

  return (
    <>
      {!allowedShown && <div>Страница недоступна</div>}
      {allowedShown && (
        <div className="mainpage">
          <div className="users-header">
            {user?.role === "admin" && (
              <button onClick={handleAddUser} type="button" className="form-button">
                Добавить
              </button>
            )}
            <div className="div-limit">
              <span className="span-limit">Показывать по</span>
              <select value={limit} onChange={handleChangeLimit}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          <div className="user-search-wrap">
            <input
              className="users-search"
              placeholder="Введите имя, телефон или email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="form-button" onClick={searchUsers}>
              Найти
            </button>
          </div>
          {users && (
            <>
              <table className="users-table">
                <tbody>
                  <tr key="0">
                    <th className="users-table-th users-table-npp">ID</th>
                    <th className="users-table-th users-table-name">Имя</th>
                    <th className="users-table-th users-table-mail">Email</th>
                    <th className="users-table-th users-table-buttons"></th>
                  </tr>
                  {users.map((item, index) => (
                    <UsersItem
                      key={item._id}
                      index={index}
                      item={item}
                      handleIconClick={handleIconClick}
                      limit={limit}
                    />
                  ))}
                </tbody>
              </table>
              <div className="paging">
                <button
                  className="paging-button"
                  onClick={() => handleSetOffset("decr")}
                  disabled={offset < 1}
                >
                  <span className="paging-arrows">&lt;</span>
                </button>
                <span className="paging-span">{offset + 1}</span>
                <button
                  className="paging-button"
                  onClick={() => handleSetOffset("incr")}
                  disabled={users.length <= limit}
                >
                  <span className="paging-arrows">&gt;</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}