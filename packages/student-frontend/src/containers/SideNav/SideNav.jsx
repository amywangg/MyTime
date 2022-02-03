import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SideNav() {
  const { handleLogout, error } = useContext(AuthContext);
  return (
    <div className="w-[30vw] h-full shadow-md bg-white px-1 absolute">
      <ul className="relative">
        <li className="relative">
          <a
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            Sidenav link 1
          </a>
        </li>
        <li className="relative">
          <a
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            Sidenav link 2
          </a>
        </li>
        <li className="relative">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
