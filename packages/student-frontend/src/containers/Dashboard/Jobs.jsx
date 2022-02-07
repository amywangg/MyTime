import React, { useState } from "react";

function Jobs() {
  const [tab, setTab] = useState("completed");

  return (
    <div className="bg-white rounded-lg flex flex-col p-8 w-full flex-grow">
      <p className="inline-block font-medium text-xl mb-2">Your Jobs</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        Look back at all the hard work you put in
      </p>
      <ul className="flex flex-wrap -mb-px h-16">
        <li className="mr-2">
          <button
            onClick={() => setTab("completed")}
            className={`${
              tab === "completed"
                ? "text-primary border-primary"
                : "text-subText border-transparent"
            } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
          >
            Completed
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setTab("pending")}
            className={`${
              tab === "pending"
                ? "text-primary border-primary"
                : "text-subText border-transparent"
            } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
            aria-current="page"
          >
            Pending
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setTab("cancelled")}
            className={`${
              tab === "cancelled"
                ? "text-primary border-primary"
                : "text-subText border-transparent"
            } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
          >
            Cancelled
          </button>
        </li>
      </ul>
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
    </div>
  );
}

Jobs.propTypes = {};

export default Jobs;
