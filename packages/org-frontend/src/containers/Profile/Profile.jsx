import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import EditButton from "../../components/EditButton/Button";
import { AuthContext } from "../../context/AuthContext";
import mail from "../../assets/mail.png";
import school from "../../assets/school.png";
import location from "../../assets/location.png";
import web from "../../assets/web.png";
import phone from "../../assets/phone.png";
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast";

function Profile() {
  const [edit, setEdit] = useState();
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState({
    email: null,
    website: null,
    location: null,
    phone_number: null,
    description: null,
  });
  const { currentUser, updateProfile } = useContext(AuthContext);

  const handleEdit = (field, text) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const handleSubmit = () => {
    updateProfile({
      id: currentUser?.id,
      email: profile.email || currentUser?.email,
      website: profile.website || currentUser?.website,
      location: profile.location || currentUser?.location,
      description: profile.description || currentUser?.description,
      phone_number: profile.phone_number || currentUser?.phone_number,
    });
    setTimeout(() => {
      setMessage(null);
      // window.location.reload();
    }, [2000]);
    setMessage("Successfully Updated");
  };

  return (
    <Page>
      {message && (
        <Toast
          message={message}
          setMessage={setMessage}
          type={message.includes("Error") ? "error" : "success"}
        />
      )}
      <div className="relative bg-white rounded-xl shadow-md flex flex-col py-8 px-10 mt-20 w-full flex-grow">
        {currentUser?.image ? (
          <img
            className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-white text-xl text-white uppercase border-4 border-white"
            src={currentUser?.image}
            alt="avatar"
          />
        ) : (
          <div className="mt-[-5rem] z-10 mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase border-4 border-white">
            {currentUser !== undefined &&
              currentUser?.name[0] + currentUser?.name[1]}
          </div>
        )}
        <div className="mt-2">
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
            <p className="flex-grow overflow-hidden">
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
        {/* phone number */}
        <div className="flex w-[300px]">
          <img
            className="h-[20px] flex-none mr-[8px] ml-[4px] pt-1"
            src={phone}
            alt="phone"
          />
          {edit === "phone_number" ? (
            <input
              id="phone_number"
              name="phone_number"
              type="phone_number"
              value={
                profile?.phone_number
                  ? profile.phone_number
                  : currentUser.phone_number
              }
              onChange={(e) => handleEdit("phone_number", e.target.value)}
              autoComplete="phone_number"
              className="flex-grow pl-2 appearance-none h-6 relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          ) : (
            <p className="flex-grow">
              {profile?.phone_number
                ? profile.phone_number
                : currentUser !== undefined && currentUser?.phone_number}
            </p>
          )}
          <div className="ml-2 pb-2 w-10">
            <EditButton onClick={() => setEdit("phone_number")} />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {edit === "description" ? (
            <textarea
              onClick={() => setEdit("description")}
              className=" flex-grow h-[80%] mb-4 resize-none  block mt-2 w-full overflow-auto px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              id="exampleFormControlTextarea1"
              value={profile?.description || currentUser?.description}
              placeholder="Add a description"
              onChange={(e) => handleEdit("description", e.target.value)}
            />
          ) : profile?.description || currentUser?.description ? (
            <textarea
              onClick={() => setEdit("description")}
              className="h-[80%] border-0 text-md flex-grow mb-4 resize-none overflow-auto block mt-2 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 font-semibold"
              id="exampleFormControlTextarea1"
              value={
                profile?.description
                  ? profile.description
                  : currentUser !== undefined && currentUser?.description
              }
              onChange={(e) => handleEdit("description", e.target.value)}
            />
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
          <Button onClick={handleSubmit} label="Save" />
        </div>
      </div>
    </Page>
  );
}

Profile.propTypes = {};

export default Profile;
