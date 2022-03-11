import React, { useState } from "react";

function Listing({ item, action, br, index, onClick, props }) {
  return (
    <div
      className={`flex h h-16 mb-2 p-2 hover:bg-gray-400 hover:bg-opacity-20 bg-[#F8F8FF] rounded-lg`}
    >
      {item.image ? (
        <img className="w-12 h-12 rounded-md" src={item.image} alt="org_img" />
      ) : (
        <div
          className="w-12 h-12 bg-primary flex justify-center items-center text-white rounded-md font-semibold"
          key={item.name + "two"}
        >
          {item.name.split(" ").map((x) => {
            return x[0];
          })}
        </div>
      )}
      <div
        className="flex flex-col ml-4 flex-grow cursor-pointer justify-center"
        key={item.name + index + "hi"}
        onClick={onClick}
      >
        <p className="font-semibold text-sm">{item.name}</p>
        <p className="text-sm">{item.location}, ON</p>
      </div>
      {action}
    </div>
  );
}

Listing.propTypes = {};

export default Listing;
