import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import EditButton from "../../components/EditButton/Button";
import { AuthContext } from "../../context/AuthContext";
import mail from "../../assets/mail.png";
import school from "../../assets/school.png";
import location from "../../assets/location.png";
import plus from "../../assets/plus.png";
import Button from "../../components/Button/Button";

function Profile() {
  const [edit, setEdit] = useState({
    email: null,
    school: null,
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
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-8 mt-20 w-full flex-grow">
        <div className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase border-4 border-white">
          {currentUser !== undefined &&
            currentUser?.first_name[0] + currentUser?.last_name[0]}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-medium">
            {currentUser !== undefined &&
              currentUser?.first_name + " " + currentUser?.last_name}
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
          <div className="ml-2 pb-2">
            <EditButton onClick={() => setEdit("email")} />
          </div>
        </div>
        {/* school */}
        <div className="flex w-[300px]">
          <img
            className="h-[20px] flex-none mr-3 pt-1"
            src={school}
            alt="school"
          />
          {edit === "school" ? (
            <input
              id="email-address"
              name="school"
              type="school"
              value={profile?.school ? profile.school : currentUser.school}
              onChange={(e) => handleEdit("school", e.target.value)}
              autoComplete="school"
              className="flex-grow pl-2 appearance-none h-6 relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          ) : (
            <p className="flex-grow">
              {profile?.school
                ? profile.school
                : currentUser !== undefined && currentUser?.school}
            </p>
          )}
          <div className="ml-2 pb-2">
            <EditButton onClick={() => setEdit("school")} />
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
          <div className="ml-2 pb-2">
            <EditButton onClick={() => setEdit("location")} />
          </div>
        </div>
        <textarea
          onClick={() => setEdit("description")}
          className="form-control resize-none block mt-3 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
          id="exampleFormControlTextarea1"
          rows="6"
          placeholder="Add a description"
          onChange={(e) => handleEdit("description", e.target.value)}
        />
        <div className="mt-3">
          <p className="flex-grow text-xl">Interests</p>
          <div className="flex text-xs mt-4 text-gray-400">
            <button className="flex">
              <img className="h-3 mt-[2px] mr-[2px]" src={plus} alt="add" /> add
              interest
            </button>
          </div>
        </div>
        <div className="absolute right-12 bottom-6 ml-[40px]">
          <Button onClick={() => {}} label="Save" />
        </div>
      </div>
    </Page>
  );
}

Profile.propTypes = {};

export default Profile;
