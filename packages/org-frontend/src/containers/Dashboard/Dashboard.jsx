import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";
import Progress from "./Partnerships";
import JobSummary from "./JobSummary";
import Partnerships from "./Partnerships";
import { SchoolContextProvider } from "../../context/SchoolContext";
import { PostingContextProvider } from "../../context/PostingContext";

function Dashboard() {
  return (
    <Page title="Dashboard">
      <PostingContextProvider>
        <JobSummary />
      </PostingContextProvider>
      <SchoolContextProvider>
        <Partnerships />
      </SchoolContextProvider>
    </Page>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
