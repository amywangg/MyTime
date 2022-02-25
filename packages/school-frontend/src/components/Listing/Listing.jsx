import React, { useState } from "react";

function Listing({ item, action, br, index, props }) {
  return (
    <div className={`flex h-16 mb-4 ${br && "border-b-[1px] border-gray-600"}`}>
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
      <div className="block ml-4 flex-grow" key={item.name + index + "hi"}>
        <p className="font-semibold text-sm">{item.name}</p>
        <p className="text-sm">{item.location}, ON</p>
      </div>
      {action}
    </div>
  );
}

Listing.propTypes = {};

export default Listing;
