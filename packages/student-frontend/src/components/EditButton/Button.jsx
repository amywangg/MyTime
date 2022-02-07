import React from "react";
import Edit from "../../assets/edit.png";

const EditButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="rounded-full hover:bg-gray-100 p-1">
      <img className="w-5 h-5" src={Edit} alt="edit" />
    </button>
  );
};

EditButton.propTypes = {};

export default EditButton;
