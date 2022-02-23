import React from "react";

const NoJobs = () => {
  return (
    <div className="h-full flex place-items-center justify-center">
      <p className="inline-block align-middle text-center">
        No jobs yet!
        <br /> Go to{" "}
        <a className="text-primary" href="/browse">
          browse
        </a>{" "}
        to get started
      </p>
    </div>
  );
};

NoJobs.propTypes = {};

export default NoJobs;
