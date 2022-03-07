import React, { useState } from "react";

const TimePicker = ({ time, setTime, field, index }) => {
  const handleChange = (value, type) => {
    let items = [...time];
    let item = { ...time[index] };
    item[field][type] = value;
    items[index] = item;
    setTime(items);
  };

  return (
    <div className="flex">
      <select
        name="hours"
        className="px-2 appearance-none h-10 w-1/3 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
        value={time[index][field].hours}
        onChange={(e) => {
          handleChange(e.target.value, "hours");
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">10</option>
        <option value="12">12</option>
      </select>
      <span className="text-xl mr-1 mt-1 ml-1">:</span>
      <select
        name="minutes"
        value={time[index][field].minutes}
        className="px-2 appearance-none h-10 w-20 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
        onChange={(e) => {
          handleChange(e.target.value, "minutes");
        }}
      >
        <option value="0">00</option>
        <option value="0">15</option>
        <option value="30">30</option>
        <option value="30">45</option>
      </select>
      <select
        name="ampm"
        className="px-2 ml-2 appearance-none h-10  w-20 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
        value={time[index][field].ampm}
        onChange={(e) => {
          handleChange(e.target.value, "ampm");
        }}
      >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
  );
};

TimePicker.propTypes = {};

export default TimePicker;
