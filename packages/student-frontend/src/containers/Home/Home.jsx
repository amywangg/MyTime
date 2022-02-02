import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { handleLogout, error } = useContext(AuthContext);

  return (
    <div className="bg-red-500 text-white">
      HELLO
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

Home.propTypes = {};

export default Home;
