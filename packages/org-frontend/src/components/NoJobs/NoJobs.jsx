import React from "react";

const NoJobs = ({ message1, message2 }) => {
  return (
    <div className="h-full flex place-items-center justify-center">
      <p className="inline-block align-middle text-center">
        {message1 || "No orgs yet!"}
        <br /> {message2 || "Spread the word for Organizations to join MyTime"}
      </p>
    </div>
  );
};

NoJobs.propTypes = {};

export default NoJobs;
