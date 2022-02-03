import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SideNav from "../SideNav";

function Page({ children }) {
  const { handleLogout, error } = useContext(AuthContext);

  return (
    <div className="flex flex-row h-screen">
      <div className="flex">
        <SideNav />
      </div>
      <div className="flex-grow bg-bg">{children}</div>
    </div>
  );
}

Page.propTypes = {};

export default Page;
