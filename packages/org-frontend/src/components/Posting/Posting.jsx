import React from "react";

const Posting = ({ title, img, org, icon, ...props }) => {
  return (
    <span className="px-4 py-2 rounded-full text-gray-500 border border-gray-300 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
      {label}
      <button className="bg-transparent hover focus:outline-none">
        <img src={icon} alt="chip-icon" />
      </button>
    </span>
  );
};

Posting.propTypes = {};

export default Posting;
