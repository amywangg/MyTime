import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";

function Home({ children }) {
  const { handleLogout, error } = useContext(AuthContext);

  return <Page>I AM TEST</Page>;
}

Home.propTypes = {};

export default Home;
