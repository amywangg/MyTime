import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import Button from "../../components/Button";
import mail from "../../assets/mail.png";
import location from "../../assets/location.png";
import web from "../../assets/web.png";
import { OrgContext } from "../../context/OrgContext";
import Loading from "../../components/Loading";
import NoJobs from "../../components/NoJobs";

function OrgProfile({ props }) {
  const [org, setOrg] = useState();
  const { orgs, orgLoading, updateOrgSchool } = useContext(OrgContext);
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
          className="text-sm font-semibold text-gray-700"
          onClick={() => navigate("/")}
        >
          {"< "}Go back
        </button>
      </div>
      <div className="relative bg-white rounded-lg flex flex-col p-8 mt-20 w-full flex-grow">
        {orgLoading ? (
          <Loading />
        ) : (
          <div>
            {org?.image ? (
              <img
                className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full uppercase border-4 border-white bg-white"
                src={org?.image}
                alt="avatar"
              />
            ) : (
              <div className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase border-4 border-white">
                {org !== undefined && org?.name[0] + org?.name[1]}
              </div>
            )}
            <div className="mt-3">
              <p className="text-2xl font-medium">
                {org !== undefined && org?.name}
              </p>
            </div>
            <div className="flex w-[300px] mt-3">
              <img
                className="h-[20px] flex-none mr-3 pt-1"
                src={mail}
                alt="email"
              />
              <p className="flex-grow mt-1">
                {org !== undefined && org?.email}
              </p>
            </div>
            {/* school */}
            <div className="flex w-[300px] mt-1">
              <img
                className="h-[20px] flex-none mr-3 pt-1"
                src={web}
                alt="web"
              />
              <a href={org?.website} target="_blank" className="flex-grow">
                {org !== undefined && org?.website}
              </a>
            </div>
            {/* location */}
            <div className="flex w-[300px]">
              <img
                className="h-[20px] flex-none mr-3 pt-1 mt-1"
                src={location}
                alt="location"
              />
              <p className="flex-grow mt-1">
                {org !== undefined && org?.location + ", ON"}
              </p>
            </div>
            <div className="flex-grow h-[100%] overflow-y-auto items-center justify-center">
              {org?.description ? (
                <p>
                  {org?.description
                    ? org.description
                    : org !== undefined && org?.description}
                </p>
              ) : (
                <NoJobs
                  message1="This org hasn't put a description"
                  message2="Check out their website"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

OrgProfile.propTypes = {};

export default OrgProfile;
