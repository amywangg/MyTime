import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";

function Home({ children }) {
  const { handleLogout, error } = useContext(AuthContext);

  return (
    <Page title="Dashboard">
      <h1>HELLO</h1>
    </Page>
  );
}

Home.propTypes = {};

export default Home;
