import React from "react";

const Button = ({ label, icon, onClick, ...props }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block  px-4 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
    >
      {icon && (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          {icon}
        </span>
      )}
      {label}
    </button>
  );
};

Button.propTypes = {};

export default Button;
