import React, { useState } from "react";
import NoJobs from "../../components/NoJobs";

function JobSummary() {
  const [tab, setTab] = useState("completed");

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full mb-10 h-1/2 overflow-auto">
      <p className="inline-block font-semibold text-xl mb-2">Upcoming Jobs</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        Check up on what's coming next
      </p>
      <div className="h-full flex place-items-center justify-center w-full bg-ghost rounded-lg">
        <p className="inline-block align-middle text-center font-semibold text-gray-600 ">
          No jobs yet!
          <br /> Go to{" "}
          <a className="text-primary" href="/postings/create">
            create posting
          </a>{" "}
          to get started
        </p>
      </div>
    </div>
  );
}

JobSummary.propTypes = {};

export default JobSummary;
