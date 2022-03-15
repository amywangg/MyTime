import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineHome } from "react-icons/ai";
import mytime from "../../assets/mytime.png";

function SideNav() {
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const { handleLogout, authLoading, currentUser } = useContext(AuthContext);

  useEffect(() => {
    setPath(window.location.pathname);
  });
  return (
    <div className="w-[25vw] max-w-[250px] h-full shadow-md bg-white absolute rounded-tr-2xl rounded-br-2xl">
      <img
        className="ml-6 mb-10 mt-10 max-w-[100%] w-32"
        src={mytime}
        alt="logo"
      />
      <div className="mx-4 border-b-2 border-gray-200 pb-4">
        <p className="text-sm font-semibold text-gray-500 mb-2">Portfolio</p>
        <ul className="relative mt-2">
          <li
            className={`${
              path === "/" ? "bg-nav font-semibold" : "font-medium hover:bg-nav"
            } relative flex py-2 px-4 items-end rounded-lg  hover:cursor-pointer hover:shadow-md mb-2`}
            onClick={() => navigate("/")}
          >
            <AiOutlineHome
              size={"16px"}
              color="rgb(107, 114, 128)"
              style={{ marginBottom: "3px", marginLeft: "-2px" }}
            />
            <p className="ml-3 flex items-center text-sm overflow-hidden whitespace-nowrap transition duration-300 ease-in-out">
              Dashboard
            </p>
          </li>
          <li
            className={`${
              path === "/profile"
                ? "bg-nav font-semibold"
                : "font-medium hover:bg-nav"
            } relative flex py-2 px-4 items-baseline rounded-lg  hover:cursor-pointer hover:shadow-md`}
            onClick={() => navigate("/profile")}
          >
            <i className="fa-regular fa-user text-sm text-gray-500" />
            <p className="ml-3 flex items-center text-sm overflow-hidden whitespace-nowrap transition duration-300 ease-in-out">
              Profile
            </p>
          </li>
        </ul>
      </div>
      <div className="mx-4 mt-[20px]">
        <p className="text-sm font-semibold text-gray-500 mb-2">Volunteer</p>
        <ul className="relative">
          <li
            className={`${
              path.includes("/browse")
                ? "bg-nav font-semibold"
                : "font-medium hover:bg-nav"
            } relative flex py-2 px-4  items-baseline rounded-lg  hover:cursor-pointer hover:shadow-md mb-2`}
            onClick={() => navigate("/browse")}
          >
            <i className="fa-regular fa-compass text-sm text-gray-500" />
            <p className="ml-3 flex items-center text-sm overflow-hidden whitespace-nowrap transition duration-300 ease-in-out">
              Browse
            </p>
          </li>
          <li
            className={`${
              path.includes("/applications")
                ? "bg-nav font-semibold"
                : "font-medium hover:bg-nav"
            } relative flex py-2 px-4  items-baseline rounded-lg  hover:cursor-pointer hover:shadow-md mb-2`}
            onClick={() => navigate("/applications")}
          >
            <i className="fa-regular fa-clipboard text-sm text-gray-500" />
            <p className="ml-3 flex items-center text-sm overflow-hidden whitespace-nowrap transition duration-300 ease-in-out">
              My Applications
            </p>
          </li>
          <li
            className={`${
              path === "/schedule"
                ? "bg-nav font-semibold"
                : "font-medium hover:bg-nav"
            } relative flex py-2 px-4 items-baseline rounded-lg  hover:cursor-pointer hover:shadow-md`}
            onClick={() => navigate("/schedule")}
          >
            <i className="fa-regular fa-calendar text-sm text-gray-500" />
            <p className="ml-3 flex items-center text-sm overflow-hidden whitespace-nowrap transition duration-300 ease-in-out">
              Schedule
            </p>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 mx-auto text-center w-full">
        <div className="border-t-[2px] border-b-[2px] border-gray-200 w-full">
          {!authLoading && (
            <div className="px-2 py-3 rounded-bl-xl rounded-br-xl">
              <div className="flex justify-start">
                <div className="m-1 mr-2 shadow-md w-11 h-11 relative flex justify-center items-center rounded-full bg-primary text-sm text-white uppercase">
                  {currentUser !== undefined &&
                    currentUser?.first_name[0] + currentUser?.last_name[0]}
                </div>
                <div className="flex flex-col justify-center text-left">
                  <p className="text-[12px] font-semibold">
                    {currentUser !== undefined &&
                      currentUser?.first_name + " " + currentUser?.last_name}
                  </p>
                  <p className="text-[12px] text-subText flex-wrap ml-[1px]">
                    {currentUser !== undefined && currentUser?.school}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="font-semibold hover:bg-nav relative w-full py-2 px-4 items-baseline rounded-lg  hover:cursor-pointer hover:shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNav;
