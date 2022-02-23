import React from "react";
import SideNav from "../SideNav";

function Page({ children, title }) {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex w-[25vw] max-w-[250px]">
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow bg-bg px-16 py-8 pb-12">
        {title && <p className="text-2xl font-medium mb-[20px]">{title}</p>}
        <div className="flex flex-col flex-grow">{children}</div>
      </div>
    </div>
  );
}

Page.propTypes = {};

export default Page;
