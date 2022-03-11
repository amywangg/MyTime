import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import mail from "../../assets/mail.png";
import location from "../../assets/location.png";
import Loading from "../../components/Loading";
import NoJobs from "../../components/NoJobs";
import { SchoolContext } from "../../context/SchoolContext";

function SchoolProfile({ props }) {
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
          className="text-sm font-semibold text-gray-700"
          onClick={() => navigate("/")}
        >
          {"< "}Go back
        </button>
      </div>
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-8 mt-20 w-full flex-grow">
        {schoolLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="w-full h-full flex-grow flex flex-col">
            {school?.image ? (
              <img
                className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full uppercase border-4 border-white bg-white"
                src={school?.image}
                alt="avatar"
              />
            ) : (
              <div className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase border-4 border-white">
                {school !== undefined && school?.name[0] + school?.name[1]}
              </div>
            )}
            <div className="mt-3">
              <p className="text-2xl font-medium">
                {school !== undefined && school?.name}
              </p>
            </div>
            <div className="flex w-[300px] mt-3">
              <img
                className="h-[20px] flex-none mr-3 pt-1"
                src={mail}
                alt="email"
              />
              <p className="flex-grow mt-1">
                {school !== undefined && school?.email}
              </p>
            </div>
            {/* location */}
            <div className="flex w-[300px]">
              <img
                className="h-[20px] flex-none mr-3 pt-1 mt-2"
                src={location}
                alt="location"
              />
              <p className="flex-grow mt-2">
                {school !== undefined && school?.location + ", ON"}
              </p>
            </div>
            <div className="flex-grow overflow-auto no-scrollbar items-center justify-center">
              {school?.description ? (
                <p>
                  {school?.description
                    ? school.description
                    : school !== undefined && school?.description}
                </p>
              ) : (
                <NoJobs
                  message1="This school hasn't put a description"
                  message2="Send an email to find out more"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

SchoolProfile.propTypes = {};

export default SchoolProfile;
