import React, { useState } from "react";

function Tabs({ tab, setTab, tabs }) {
  return (
    <ul className="flex flex-wrap ">
      {tabs.map((x) => (
        <li className="mr-2" key={x}>
          <button
            onClick={() => setTab(x)}
            className={`${
              tab === x
                ? "text-primary border-primary"
                : "text-subText border-transparent"
            } inline-block py-[2px] px-4 text-sm font-semibold text-center border-b-2 hover:text-primary hover:border-primary`}
          >
            {x}
          </button>
        </li>
      ))}
    </ul>
  );
}

Tabs.propTypes = {};

export default Tabs;
