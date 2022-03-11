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

function Posting({ item, org, action, br, index, onClick, props }) {
  const postDate = new Date(item.date);
  return (
    <div
      className={`flex h-16 mb-2 p-2 hover:bg-gray-400 hover:bg-opacity-20 bg-[#F8F8FF] rounded-lg`}
    >
      {org.image ? (
        <img className="w-12 h-12 rounded-md" src={org.image} alt="org_img" />
      ) : (
        <div
          className="w-12 h-12  flex justify-center items-center bg-primary text-white"
          key={org.name + "two"}
        >
          {org.name.split(" ").map((x) => {
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
        <p className="text-xs font-semibold text-gray-600">{item.location}</p>
        <p className="text-xs font-semibold text-gray-600">
          {postDate &&
            `${weekday[postDate.getDay()]}, ${
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
