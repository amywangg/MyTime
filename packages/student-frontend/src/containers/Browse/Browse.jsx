import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";

function Browse() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const { currentUser } = useContext(AuthContext);

  return (
    <Page title="Make a difference today">
      <div className="relative bg-white rounded-lg flex flex-col p-5 h-26 w-full mb-8 mt-3">
        <p>
          Hi {currentUser !== undefined && currentUser?.first_name}, where would
          you like to give back today?
        </p>
        <div className="flex justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input-basic w-[45%] text-xs rounded-lg mt-2 mr-2"
            id="keyword"
            autoComplete="none"
            placeholder="Title, Company, Keywords..."
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="input-basic w-[40%] text-xs rounded-lg mt-2 mr-2"
            id="keyword"
            autoComplete="none"
            placeholder="Location"
          />
          <button className="rounded-lg border-[1px] h-[34px] mt-2 border-primary text-primary px-6 text-xs py-0 hover:bg-primary hover:text-white">
            Search
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-lg flex flex-col p-6 w-full flex-grow">
        <p className="text-xl">Explore</p>
        <p className="text-xs text-subText mt-1">
          Browse the newest opportunities
        </p>
      </div>
    </Page>
  );
}

Browse.propTypes = {};

export default Browse;
