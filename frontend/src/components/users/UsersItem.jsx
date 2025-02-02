import React from "react";
import viewIcon from "../../pics/eye.png";
import editIcon from "../../pics/pen.png";
import deleteIcon from "../../pics/remove.png";
import reservIcon from "../../pics/reservation.png";
import { useSelector } from "react-redux";

export default function UsersItem({ item, index, handleIconClick, limit }) {
  const { user } = useSelector((state) => state.crUser);

  if (index >= limit) return null;

  return (
    <tr key={item._id}>
      <td className="users-table-td users-table-npp">{index + 1}</td>
      <td className="users-table-td users-table-name">
        {item.name.length > 18 ? `${item.name.substr(0, 18)}...` : item.name}
      </td>
      <td className="users-table-td users-table-mail">{item.email}</td>
      <td className="users-table-td users-table-buttons">
        <img
          className="users-icon"
          src={viewIcon}
          onClick={(e) => handleIconClick(e, item)}
          alt="view"
          title="Просмотр"
        />
        {user.role === "manager" && (
          <img
            className="users-icon"
            src={reservIcon}
            onClick={(e) => handleIconClick(e, item)}
            alt="reserv"
            title="Брони"
          />
        )}
        {user.role === "admin" && (
          <>
            <img
              className="users-icon"
              src={editIcon}
              onClick={(e) => handleIconClick(e, item)}
              alt="edit"
              title="Редактирование"
            />
            <img
              className="users-icon"
              src={deleteIcon}
              onClick={(e) => handleIconClick(e, item)}
              alt="delete"
              title="Удалить"
            />
          </>
        )}
      </td>
    </tr>
  );
}