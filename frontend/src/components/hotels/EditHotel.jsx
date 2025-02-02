import React from "react";
import { useDispatch } from "react-redux";
import { hotelByIdSearch } from "../../store/api/hotels/hotelByIdSearch";
import { hotelsUpdate } from "../../store/api/hotels/hotelsUpdate";
import { actHotelsPics } from "../../store/actions/actionCreators";
import EditEntity from "./EditEntity";

export default function EditHotel() {
  const dispatch = useDispatch();

  return (
    <EditEntity
      entityType="hotel"
      fetchEntity={hotelByIdSearch}
      updateEntity={hotelsUpdate}
      picsSelector={(state) => state.hotelsList.hotelsPics}
      picsAction={actHotelsPics}
    />
  );
}