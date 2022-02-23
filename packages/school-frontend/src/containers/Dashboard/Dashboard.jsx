import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";
import NoJobs from "../../components/NoJobs";

function Dashboard() {
  const { handleLogout, error } = useContext(AuthContext);
  const [tab, setTab] = useState("partners");

  return (
    <Page title="Partnerships">
      <div className="bg-white rounded-lg flex flex-col p-8 w-full flex-grow">
        <p className="inline-block font-medium text-xl mb-2">
          Your Organizations
        </p>
        <p className="text-subText text-xs flex-wrap mb-4">
          Take a look at the places your students can make an impact on
        </p>
        <ul className="flex flex-wrap -mb-px h-16">
          <li className="mr-2">
            <button
              onClick={() => setTab("partners")}
              className={`${
                tab === "partners"
                  ? "text-primary border-primary"
                  : "text-subText border-transparent"
              } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
            >
              Partners
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
              onClick={() => setTab("rejected")}
              className={`${
                tab === "rejected"
                  ? "text-primary border-primary"
                  : "text-subText border-transparent"
              } inline-block py-[2px] px-4 text-sm font-medium text-center border-b-2 hover:text-primary hover:border-primary`}
            >
              Rejected
            </button>
          </li>
        </ul>
        <NoJobs />
      </div>
    </Page>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
