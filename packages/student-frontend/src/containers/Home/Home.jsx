import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SideNav from "../SideNav";

function Home() {
  const { handleLogout, error } = useContext(AuthContext);

  return (
    <div className="bg-red-500 text-white">
      <SideNav />
    </div>
  );
}

Home.propTypes = {};

export default Home;
