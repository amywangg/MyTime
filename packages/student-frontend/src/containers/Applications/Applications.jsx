import React, { useState } from "react";
import NoJobs from "../../components/NoJobs";
import Page from "../../components/Page";

function Applications() {
  const [tab, setTab] = useState("applied");
  return (
    <Page title="My Applications">
      <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full flex-grow">
        <div className="flex justify-between">
          <ul className="flex flex-wrap -mb-px h-16">
            <li className="mr-2">
              <button
                onClick={() => setTab("applied")}
                className={`${
                  tab === "applied"
                    ? "text-primary border-primary"
                    : "text-subText border-transparent"
                } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
              >
                Applied
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setTab("saved")}
                className={`${
                  tab === "saved"
                    ? "text-primary border-primary"
                    : "text-subText border-transparent"
                } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
                aria-current="page"
              >
                Saved
              </button>
            </li>
          </ul>
          {/* TODO */}
          <ul className="flex flex-wrap -mb-px h-16">
            <li>
              <button
                className="text-subText flex py-[2px] px-4 text-sm font-medium text-center hover:text-primary hover:border-primary"
                aria-current="page"
              >
                Sort by
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2 mt-[3px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <NoJobs />
      </div>
    </Page>
  );
}

Applications.propTypes = {};

export default Applications;
