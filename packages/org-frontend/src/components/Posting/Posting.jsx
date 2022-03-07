import React from "react";

function Posting({ item, org, action, br, index, onClick, props }) {
  return (
    <div
      className={`flex h-16 mb-2 p-2 ${
        br && "border-b-[1px] border-gray-600"
      } hover:bg-gray-400 hover:bg-opacity-20 hover:rounded-sm`}
    >
      {org.image ? (
        <img className="w-12 h-12" src={org.image} alt="org_img" />
      ) : (
        <div className="w-12 h-12 bg-primary text-white" key={org.name + "two"}>
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
        <p className="font-semibold text-sm">{item.title}</p>
        <p className="text-sm">{item.location}, ON</p>
      </div>
      {action}
    </div>
  );
}

Posting.propTypes = {};

export default Posting;
