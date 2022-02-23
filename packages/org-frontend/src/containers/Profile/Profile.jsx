import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import EditButton from "../../components/EditButton/Button";
import { AuthContext } from "../../context/AuthContext";
import mail from "../../assets/mail.png";
import school from "../../assets/school.png";
import location from "../../assets/location.png";
import web from "../../assets/web.png";
import Button from "../../components/Button/Button";

function Profile() {
  const [edit, setEdit] = useState({
    email: null,
    website: null,
    location: null,
    description: null,
  });
  const [profile, setProfile] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleEdit = (field, text) => {
    const temp = Object.assign({}, currentUser);
    setProfile((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  return (
    <Page>
      <div className="relative bg-white rounded-lg flex flex-col p-8 mt-20 w-full flex-grow">
        <div className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase border-4 border-white">
          {currentUser !== undefined &&
            currentUser?.name[0] + currentUser?.name[1]}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-medium">
            {currentUser !== undefined && currentUser?.name}
          </p>
        </div>
        <div className="flex w-[300px] mt-3">
          <img
            className="h-[20px] flex-none mr-3 pt-1"
            src={mail}
            alt="email"
          />
          {edit === "email" ? (
            <input
              id="email-address"
              name="email"
              type="email"
              value={profile?.email ? profile.email : currentUser.email}
              onChange={(e) => handleEdit("email", e.target.value)}
              autoComplete="email"
              className="flex-grow appearance-none h-6 relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          ) : (
            <p className="flex-grow">
              {profile?.email
                ? profile.email
                : currentUser !== undefined && currentUser?.email}
            </p>
          )}
          <div className="ml-2 pb-2 w-10">
            <EditButton onClick={() => setEdit("email")} />
          </div>
        </div>
        {/* school */}
        <div className="flex w-[300px]">
          <img className="h-[20px] flex-none mr-3 pt-1" src={web} alt="web" />
          {edit === "website" ? (
            <input
              id="website"
              name="website"
              type="website"
              value={profile?.website ? profile.website : currentUser.website}
              onChange={(e) => handleEdit("website", e.target.value)}
              autoComplete="website"
              className="flex-grow pl-2 appearance-none h-6 relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          ) : (
            <p className="flex-grow">
              {profile?.website
                ? profile.website
                : currentUser !== undefined && currentUser?.website}
            </p>
          )}
          <div className="ml-2 pb-2 w-10">
            <EditButton onClick={() => setEdit("website")} />
          </div>
        </div>
        {/* location */}
        <div className="flex w-[300px]">
          <img
            className="h-[20px] flex-none mr-3 pt-1"
            src={location}
            alt="location"
          />
          {edit === "location" ? (
            <input
              id="location"
              name="location"
              type="location"
              value={
                profile?.location ? profile.location : currentUser.location
              }
              onChange={(e) => handleEdit("location", e.target.value)}
              autoComplete="location"
              className="flex-grow pl-2 appearance-none h-6 relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          ) : (
            <p className="flex-grow">
              {profile?.location
                ? profile.location
                : currentUser !== undefined && currentUser?.location}
            </p>
          )}
          <div className="ml-2 pb-2 w-10">
            <EditButton onClick={() => setEdit("location")} />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {edit === "description" ? (
            <textarea
              onClick={() => setEdit("description")}
              className="form-control flex-grow mb-10 resize-none block mt-3 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              id="exampleFormControlTextarea1"
              rows="9"
              value={profile?.description || currentUser?.description}
              placeholder="Add a description"
              onChange={(e) => handleEdit("description", e.target.value)}
            />
          ) : profile?.description || currentUser?.description ? (
            <p>
              {profile?.description
                ? profile.description
                : currentUser !== undefined && currentUser?.description}
            </p>
          ) : (
            <div className="flex flex-col justify-center items-center h-[100%] text-center">
              <p className="text-center">
                Want students to know what you're about?
              </p>
              <div
                className="text-primary"
                onClick={() => setEdit("description")}
              >
                Click to add a description
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end mr-[20px]">
          <Button onClick={() => {}} label="Save" />
        </div>
      </div>
    </Page>
  );
}

Profile.propTypes = {};

export default Profile;
