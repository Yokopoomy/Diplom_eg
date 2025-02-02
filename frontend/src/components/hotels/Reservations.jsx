import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actRegRoomsDelete } from "../../store/actions/actionCreators";
import ReservationsItems from "./ReservationsItems";

export default function Reservations() {
  const { regRooms } = useSelector((state) => state.regrooms);
  const dispatch = useDispatch();

  function fnDeleteResRoom(id) {
    console.log("Delete id=", id);
    dispatch(actRegRoomsDelete(id));
  }

  return (
    <>
      <div className="hotels-header">
        <h1>Забронированные номера:</h1>
      </div>
      {regRooms.length < 1 && (
        <h2 style={{ color: "red", fontSise: "20px" }}>
          У Вас нет забронированных номеров
        </h2>
      )}
      {regRooms &&
        Array.isArray(regRooms) &&
        regRooms.map((i) => (
          <ReservationsItems
            key={i._id}
            item={i}
            deleteItem={fnDeleteResRoom}
          />
        ))}
    </>
  );
}
