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
      className={`flex h-18 mb-2 p-2 ${
        br && "border-b-[1px] border-gray-600"
      } hover:bg-gray-400 hover:bg-opacity-20 hover:rounded-sm`}
    >
      {org.image ? (
        <img className="w-14 h-14" src={org.image} alt="org_img" />
      ) : (
        <div className="w-14 h-14 bg-primary text-white" key={org.name + "two"}>
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
        <p className="font-semibold text-sm">{item.title}</p>
        <p className="text-xs">{item.location}</p>
        <p className="text-xs">
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
