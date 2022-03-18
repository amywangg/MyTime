import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import { useParams, useNavigate } from "react-router-dom";
import { OrgContext } from "../../context/OrgContext";
import Loading from "../../components/Loading";
import NoJobs from "../../components/NoJobs";

function OrgProfile() {
  const [org, setOrg] = useState();
  const { orgs, orgLoading } = useContext(OrgContext);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orgLoading) {
      setOrg(orgs.filter((org) => org.id === parseInt(id))[0]);
    }
  }, [orgLoading]);

  return (
    <Page>
      <div>
        <button
          className="absolute right-10 text-sm font-semibold text-gray-700"
          onClick={() => navigate(-1)}
        >
          {"< "}Go back
        </button>
      </div>
      <div className="relative bg-white rounded-xl shadow-md p-8 mt-8 w-full h-full min-h-0">
        {orgLoading ? (
          <Loading />
        ) : (
          <div className="flex">
            {org?.image ? (
              <img
                className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full "
                src={org?.image}
                alt="avatar"
              />
            ) : (
              <div className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                {org !== undefined && org?.name[0] + org?.name[1]}
              </div>
            )}

            <div className="mt-3 ml-4">
              <p className="text-xl font-semibold">
                {org !== undefined && org?.name}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {org !== undefined && org?.location}, ON
              </p>
            </div>
          </div>
        )}
        {orgLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex mt-6">
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">Location</p>
                <p className="border-none pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm">
                  {org?.location}
                </p>
              </div>
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">Website</p>
                <a
                  href={org?.website}
                  target="_blank"
                  className="border-none overflow-hidden text-blue-500 pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 rounded-md  sm:text-sm"
                >
                  {org?.website}
                </a>
              </div>
            </div>
            <div className="flex mt-3">
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">E-mail</p>
                <p className="border-none pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm">
                  {org?.email}
                </p>
              </div>
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">Phone Number</p>
                <p className="border-none pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm">
                  {org?.phone_number}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <div className="w-full px-4">
                <p className="text-xs font-semibold ml-2 my-1">Description</p>
                <div className="flex-grow overflow-auto no-scrollbar items-center justify-center">
                  {org?.description ? (
                    <textarea
                      className="h-[100%] border-0 text-md flex-grow mb-4 resize-none overflow-auto block mt-2 w-full px-3 py-1.5 text-sm font-normal bg-ghost bg-clip-padding transition ease-in-out placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                      rows="12"
                      value={org?.description || ""}
                      placeholder="Add a description about you"
                      disabled
                    />
                  ) : (
                    <NoJobs
                      message1="This org hasn't put a description"
                      message2="Send an email to find out more"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

OrgProfile.propTypes = {};

export default OrgProfile;
