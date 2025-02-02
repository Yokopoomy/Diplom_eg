import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actRoomsPics, actUserError } from "../../store/actions/actionCreators";
import ImageHandler from "./ImageHandler";

export default function AddRoomPics() {
  const { roomsPics } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  return (
    <ImageHandler
      pics={roomsPics}
      setPics={actRoomsPics}
      maxPics={10}
      maxSizeMB={10}
      minWidth={1000}
      maxSumSides={5000}
      errorAction={actUserError}
    />
  );
}