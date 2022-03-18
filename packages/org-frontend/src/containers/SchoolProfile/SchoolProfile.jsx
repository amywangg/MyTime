import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import { useParams, useNavigate } from "react-router-dom";
import { SchoolContext } from "../../context/SchoolContext";
import Loading from "../../components/Loading";
import NoJobs from "../../components/NoJobs";

function SchoolProfile() {
  const [school, setSchool] = useState();
  const { schools, schoolLoading } = useContext(SchoolContext);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!schoolLoading) {
      setSchool(schools.filter((school) => school.id === parseInt(id))[0]);
    }
  }, [schoolLoading]);

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
        {schoolLoading ? (
          <Loading />
        ) : (
          <div className="flex">
            {school?.image ? (
              <img
                className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full "
                src={school?.image}
                alt="avatar"
              />
            ) : (
              <div className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                {school !== undefined && school?.name[0] + school?.name[1]}
              </div>
            )}

            <div className="mt-3 ml-4">
              <p className="text-xl font-semibold">
                {school !== undefined && school?.name}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {school !== undefined && school?.location}, ON
              </p>
            </div>
          </div>
        )}
        {schoolLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex mt-6">
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">Location</p>
                <p className="border-none pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm">
                  {school?.location}
                </p>
              </div>
              <div className="w-1/2 px-4" />
            </div>
            <div className="flex mt-3">
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">E-mail</p>
                <p className="border-none pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm">
                  {school?.email}
                </p>
              </div>
              <div className="w-1/2 px-4" />
            </div>

            <div className="flex flex-col mt-3">
              <div className="w-full px-4">
                <p className="text-xs font-semibold ml-2 my-1">Description</p>
                <div className="flex-grow overflow-auto no-scrollbar items-center justify-center">
                  {school?.description ? (
                    <textarea
                      className="h-[100%] border-0 text-md flex-grow mb-4 resize-none overflow-auto block mt-2 w-full px-3 py-1.5 text-sm font-normal bg-ghost bg-clip-padding transition ease-in-out placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                      rows="12"
                      value={school?.description || ""}
                      placeholder="Add a description about you"
                      disabled
                    />
                  ) : (
                    <NoJobs
                      message1="This school hasn't put a description"
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

SchoolProfile.propTypes = {};

export default SchoolProfile;
