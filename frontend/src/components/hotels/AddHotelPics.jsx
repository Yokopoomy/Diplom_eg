import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsPics, actUserError } from "../../store/actions/actionCreators";
import ImageHandler from "./ImageHandler";

export default function AddHotelPics() {
  const { hotelsPics } = useSelector((state) => state.hotelsList);
  const dispatch = useDispatch();

  return (
    <ImageHandler
      pics={hotelsPics}
      setPics={actHotelsPics}
      maxPics={10}
      maxSizeMB={10}
      minWidth={1000}
      maxSumSides={5000}
      errorAction={actUserError}
    />
  );
}