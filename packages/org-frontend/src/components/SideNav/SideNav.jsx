import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function SideNav() {
  const [path, setPath] = useState("");
  const { handleLogout, authLoading, currentUser } = useContext(AuthContext);

  useEffect(() => {
    setPath(window.location.pathname);
  });

  return (
    <div className="w-[25vw] max-w-[250px] h-full shadow-md bg-white px-1 absolute">
      {!authLoading && (
        <div>
          <div className="flex justify-center mt-8">
            {currentUser?.image ? (
              <img
                className="m-1 mr-2 w-24 h-24 relative flex justify-center items-center rounded-full"
                src={currentUser.image}
                alt="avatar"
              />
            ) : (
              <div className="m-1 mr-2 w-24 h-24 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                {currentUser !== undefined &&
                  currentUser.name.split(" ").map((x) => {
                    return x[0];
                  })}
              </div>
            )}
          </div>
          <div className="ml-[40px] mt-[10px]">
            <p className="text-[12px] font-semibold mb-[5px]">
              {currentUser !== undefined && currentUser?.name}
            </p>
            <p className="text-[12px] text-subText flex-wrap">
              {currentUser !== undefined && currentUser?.location}, ON
            </p>
          </div>
        </div>
      )}

      <div className="ml-[40px] mt-[40px]">
        <h1 className="mb-2">PORTFOLIO</h1>
        <ul className="relative">
          <li className="relative">
            <a
              className={`${
                path === "/"
                  ? "text-primary border-b-2 border-primary"
                  : "text-subText"
              } flex items-center text-sm py-2 px-[2px] h-[30px] mb-1  overflow-hidden text-ellipsis whitespace-nowrap hover:border-b-2 hover:border-primary hover:text-primary transition duration-300 ease-in-out`}
              href="/"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Dashboard
            </a>
          </li>
          <li className="relative">
            <a
              className={`${
                path === "/profile"
                  ? "text-primary border-b-2 border-primary"
                  : "text-subText"
              } flex items-center text-sm py-2 px-[2px] h-[30px] mb-1  overflow-hidden text-ellipsis whitespace-nowrap hover:border-b-2 hover:border-primary hover:text-primary transition duration-300 ease-in-out`}
              href="/profile"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Profile
            </a>
          </li>
        </ul>
      </div>
      <div className="ml-[40px] mt-[40px]">
        <h1 className="mb-2">VOLUNTEER</h1>
        <ul className="relative">
          <li className="relative">
            <a
              className={`${
                path === "/postings"
                  ? "text-primary border-b-2 border-primary"
                  : "text-subText"
              } flex items-center text-sm py-2 px-[2px] h-[30px] mb-1  overflow-hidden text-ellipsis whitespace-nowrap hover:border-b-2 hover:border-primary hover:text-primary transition duration-300 ease-in-out`}
              href="/postings"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              My Postings
            </a>
          </li>
          <li className="relative">
            <a
              className={`${
                path === "/schedule"
                  ? "text-primary border-b-2 border-primary"
                  : "text-subText"
              } flex items-center text-sm py-2 px-[2px] h-[30px] mb-1  overflow-hidden text-ellipsis whitespace-nowrap hover:border-b-2 hover:border-primary hover:text-primary transition duration-300 ease-in-out`}
              href="/schedule"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Schedule
            </a>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-16 ml-[40px]">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNav;
