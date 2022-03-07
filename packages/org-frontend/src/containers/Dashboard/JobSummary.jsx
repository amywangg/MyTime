import React, { useState } from "react";
import NoJobs from "../../components/NoJobs";

function JobSummary() {
  const [tab, setTab] = useState("completed");

  return (
    <div className="bg-white rounded-lg flex flex-col p-8 w-full mb-10 h-1/3 overflow-auto">
      <p className="inline-block font-medium text-xl mb-2">Upcoming Jobs</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        Check up on what's coming next
      </p>
      <div className="h-full flex place-items-center justify-center">
        <p className="inline-block align-middle text-center">
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
