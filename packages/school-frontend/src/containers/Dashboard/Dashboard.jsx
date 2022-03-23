import React, { useContext, useState } from "react";
import { OrgContext, OrgContextProvider } from "../../context/OrgContext";
import Page from "../../components/Page";
import NoJobs from "../../components/NoJobs";
import Tabs from "../../components/Tabs";
import Loading from "../../components/Loading";
import Orgs from "./Orgs";

function Dashboard() {
  const [tab, setTab] = useState("Partners");
  const { orgs, orgLoading, updateOrgSchool } = useContext(OrgContext);

  return (
    <Page title="Partnerships">
      <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full flex-grow  min-h-0 overflow-auto">
        <p className="inline-block font-semibold text-xl mb-2">
          Your Organizations
        </p>
        <p className="text-subText text-xs flex-wrap mb-4">
          Take a look at the places your students can make an impact on
        </p>
        <Tabs
          tab={tab}
          setTab={setTab}
          tabs={["Partners", "Pending", "Rejected"]}
        />
        {orgLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : !orgs || orgs.length === 0 ? (
          <NoJobs />
        ) : (
          orgs && (
            <Orgs tab={tab} orgs={orgs} updateOrgSchool={updateOrgSchool} />
          )
        )}
      </div>
    </Page>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
