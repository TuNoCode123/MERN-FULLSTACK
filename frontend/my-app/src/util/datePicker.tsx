import React, { PropsWithChildren, useState } from "react";
import DatePicker from "react-datepicker";

const Calender = ({
  startDate,
  setStartDate,
}: {
  startDate: Date;
  setStartDate: any;
}) => {
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={handleChangeDate}
      minDate={new Date()}
      className="form-control"
      dateFormat="MM/dd/yyyy"
    />
  );
};
export default Calender;
