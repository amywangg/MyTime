import React, { useState } from "react";

function Listing({ item, action, br, index, onClick, props }) {
  return (
    <div
      className={`flex h-16 mb-2 p-2 ${
        br && "border-b-[1px] border-gray-600"
      } hover:bg-gray-400 hover:bg-opacity-20 hover:rounded-sm`}
    >
      {item.image ? (
        <img className="w-12 h-12" src={item.image} alt="org_img" />
      ) : (
        <div
          className="w-12 h-12 bg-primary text-white"
          key={item.name + "two"}
        >
          {item.name.split(" ").map((x) => {
            return x[0];
          })}
        </div>
      )}
      <div
        className="block ml-4 flex-grow cursor-pointer"
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
