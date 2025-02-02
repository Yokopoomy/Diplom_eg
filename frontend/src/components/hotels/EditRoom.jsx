import React from "react";
import { useDispatch } from "react-redux";
import { roomsByIdSearch } from "../../store/api/hotels/roomsByIdSearch";
import { roomsUpdate } from "../../store/api/hotels/roomsUpdate";
import { actRoomsPics } from "../../store/actions/actionCreators";
import EditEntity from "./EditEntity";

export default function EditRoom() {
  const dispatch = useDispatch();

  return (
    <EditEntity
      entityType="room"
      fetchEntity={roomsByIdSearch}
      updateEntity={roomsUpdate}
      picsSelector={(state) => state.rooms.roomsPics}
      picsAction={actRoomsPics}
    />
  );
}