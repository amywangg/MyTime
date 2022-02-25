import React from "react";
import Edit from "../../assets/edit.png";

const Loading = () => {
  return (
    <div
      className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-primary
  "
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
