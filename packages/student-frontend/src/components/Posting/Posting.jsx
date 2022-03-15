import React from "react";
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Posting({ item, action, index, onClick, props }) {
  const postDate = new Date(item.date);
  return (
    <div
      className={`flex h-16 mb-2 p-2 hover:bg-gray-400 hover:bg-opacity-20 bg-[#F8F8FF] rounded-lg`}
      key={item.name}
    >
      {item.image ? (
        <img className="w-12 h-12 rounded-md" src={item.image} alt="org_img" />
      ) : (
        <div
          className="w-12 h-12  flex justify-center items-center rounded-md bg-primary text-white"
          key={item.name + "two"}
        >
          {item.name.split(" ").map((x) => {
            return x[0];
          })}
        </div>
      )}
      <div
        className="block ml-4 flex-grow cursor-pointer"
        key={item.title + index + "hi"}
        onClick={onClick}
      >
        <p className="font-semibold text-xs">{item.title}</p>
        <p className="text-xs font-semibold text-gray-600">{item.name}</p>
        <p className="text-xs font-semibold text-gray-600">
          {postDate &&
            `${
              month[postDate.getMonth()]
            } ${postDate.getDate()}, ${postDate.getFullYear()}`}
        </p>
      </div>
      {action}
    </div>
  );
}

Posting.propTypes = {};

export default Posting;
