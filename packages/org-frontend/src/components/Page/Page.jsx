import React from "react";
import SideNav from "../SideNav";

function Page({ children, title }) {
  return (
    <div className="flex h-screen flex-1 max-h-[100vh]">
      <div className="flex w-[35vw] max-w-[250px]">
        <SideNav />
      </div>
      <div className="flex flex-col flex-1 bg-bg px-16 py-8 pb-12 max-h-[100vh] rounded-tl-lg rounded-bl-lg shadow-xl">
        {title && <p className="text-2xl font-bold mb-[20px]">{title}</p>}
        <div className="flex flex-col flex-1 max-h-[100vh] min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}

Page.propTypes = {};

export default Page;
