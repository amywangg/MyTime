import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import { AuthContext } from "../../context/AuthContext";
import plus from "../../assets/plus.png";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";

function Profile() {
  const [profile, setProfile] = useState({
    email: null,
    website: null,
    location: null,
    phone_number: null,
    description: "",
  });
  const [message, setMessage] = useState(null);
  const { currentUser, authLoading, updateUser } = useContext(AuthContext);

  const handleEdit = (field, text) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const handleSubmit = () => {
    updateUser({
      id: currentUser.id,
      email: profile.email || currentUser.email,
      website: profile.website || currentUser.website,
      location: profile.location || currentUser.location,
      phone_number: profile.phone_number || currentUser.phone_number,
      description: profile.description || currentUser.description,
    });
    setTimeout(() => {
      setMessage(null);
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
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-8 w-full flex-grow">
        {authLoading ? (
          <Loading />
        ) : (
          <div className="flex">
            {currentUser?.image ? (
              <img
                className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full "
                src={currentUser?.image}
                alt="avatar"
              />
            ) : (
              <div className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                {currentUser !== undefined &&
                  currentUser?.name[0] + currentUser?.name[1]}
              </div>
            )}

            <div className="mt-3 ml-4">
              <p className="text-xl font-semibold">
                {currentUser !== undefined && currentUser?.name}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {currentUser !== undefined && currentUser?.location}
              </p>
            </div>
          </div>
        )}
        {authLoading ? (
          <Loading />
        ) : (
          <div>
            <p className="font-semibold text-l mt-6 text-primary ml-4">
              Update Your Profile
            </p>
            <div className="flex mt-3">
              {/* <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">First Name</p>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={
                    profile?.first_name
                      ? profile.first_name
                      : currentUser?.first_name
                  }
                  onChange={(e) => handleEdit("first_name", e.target.value)}
                  autoComplete="first_name"
                  className="px-3 border-none outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
                />
              </div> */}
              {/* <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">
                  Middle Name (opt)
                </p>
                <input
                  id="middle_name"
                  name="middle_name"
                  type="text"
                  value={
                    profile?.middle_name
                      ? profile.middle_name
                      : currentUser?.middle_name
                  }
                  onChange={(e) => handleEdit("middle_name", e.target.value)}
                  autoComplete="middle_name"
                  className="border-none px-3 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
                />
              </div> */}
            </div>
            <div className="flex mt-3">
              {/* <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">Last Name</p>
                <input
                  value={
                    profile?.last_name
                      ? profile.last_name
                      : currentUser?.last_name
                  }
                  type="text"
                  onChange={(e) => handleEdit("last_name", e.target.value)}
                  className="border-none pl-3 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
                />
              </div> */}
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">E-mail</p>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={profile?.email ? profile.email : currentUser?.email}
                  onChange={(e) => handleEdit("email", e.target.value)}
                  autoComplete="email"
                  className="border-none outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <div className="w-full px-4">
                <p className="text-xs font-semibold ml-2 my-1">Description</p>
                <textarea
                  className="h-[80%] border-0 text-md flex-grow mb-4 resize-none overflow-auto block mt-2 w-full px-3 py-1.5 text-sm font-normal bg-ghost bg-clip-padding transition ease-in-out placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                  rows="6"
                  value={
                    profile?.description
                      ? profile.description
                      : currentUser?.description || ""
                  }
                  placeholder="Add a description about you"
                  onChange={(e) => handleEdit("description", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="absolute right-12 bottom-6 ml-[40px]">
          <button
            type="button"
            className="inline-block px-5 py-2.5 bg-red-400 mr-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
          <Button onClick={handleSubmit} label="Save" />
        </div>
      </div>
    </Page>
  );
}

Profile.propTypes = {};

export default Profile;
