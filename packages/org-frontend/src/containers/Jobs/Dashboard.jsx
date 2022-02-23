import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";
import Progress from "./Partnerships";
import Jobs from "./Jobs";
import Partnerships from "./Partnerships";

function Dashboard() {
  const { handleLogout, error } = useContext(AuthContext);

  return (
    <Page title="Dashboard">
      <Jobs />
      {/* <Partnerships /> */}
    </Page>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
