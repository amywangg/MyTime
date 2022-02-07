import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";
import Progress from "./Progress";
import Jobs from "./Jobs";

function Dashboard() {
  const { handleLogout, error } = useContext(AuthContext);

  return (
    <Page title="Dashboard">
      <Progress />
      <Jobs />
    </Page>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
