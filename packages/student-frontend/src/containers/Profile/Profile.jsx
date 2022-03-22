import React, { useContext, useState, useEffect, useRef } from "react";
import Page from "../../components/Page";
import { AuthContext } from "../../context/AuthContext";
import plus from "../../assets/plus.png";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import { interests } from "./interests";
import Select from "react-select";

const Menu = React.forwardRef(({ options, setSkills, skills }, ref) => (
  <ul
    ref={ref}
    className="h-48 overflow-auto dropdown-menu min-w-max bottom-[10px] left-[70px] absolute bg-white text-base z-50 float-right py-2 list-none text-left rounded-lg shadow-lg border-none"
  >
    {options.map((option) => (
      <li key={option}>
        <button
          className="
              dropdown-item
              text-xs
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
          onClick={() => setSkills([...skills, option])}
        >
          {option}
        </button>
      </li>
    ))}
  </ul>
));

const Chip = ({ label, onClick, props }) => (
  <span className="h-5 px-[6px] pl-[10px] py-[2px] mr-1 mt-2 rounded-full text-xs text-gray-600 bg-nav flex align-center w-max cursor-pointer transition duration-300 ease">
    {label}
    <button
      onClick={onClick}
      className="bg-transparent hover focus:outline-none"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="times"
        className="w-2 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
      >
        <path
          fill="currentColor"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        ></path>
      </svg>
    </button>
  </span>
);

function Profile() {
  const [profile, setProfile] = useState({
    first_name: null,
    middle_name: null,
    last_name: null,
    email: null,
    school: null,
    school_id: null,
    description: "",
  });
  const [showMenu, setShowMenu] = useState(false);
  const [schools, setSchools] = useState(null);
  const [message, setMessage] = useState(null);
  const [skills, setSkills] = useState([]);
  const ref = useRef(null);
  const { currentUser, authLoading, getSchools, updateUser } =
    useContext(AuthContext);

  useOnClickOutside(ref, () => setShowMenu(false));

  useEffect(() => {
    getSchools().then((res) => setSchools(res.data));
  }, []);

  useEffect(() => {
    setSkills(currentUser?.skills?.split(", "));
  }, [authLoading]);

  const handleEdit = (field, text) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const handleSubmit = () => {
    updateUser({
      id: currentUser?.id,
      first_name: profile.first_name || currentUser?.first_name,
      middle_name: profile.middle_name || currentUser?.middle_name,
      last_name: profile.last_name || currentUser?.last_name,
      email: profile.email || currentUser?.email,
      school: profile.school || currentUser?.school,
      school_id: profile.school_id || currentUser?.school_id,
      description: profile.description || currentUser?.description,
      skills: skills.length > 0 ? skills.join(", ") : "tbd",
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
        {authLoading && skills?.length > 0 ? (
          <Loading />
        ) : (
          <div className="flex">
            <div className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
              {currentUser !== undefined &&
                currentUser?.first_name[0] + currentUser?.last_name[0]}
            </div>
            <div className="mt-3 ml-4">
              <p className="text-xl font-semibold">
                {currentUser !== undefined &&
                  currentUser?.first_name + " " + currentUser?.last_name}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {currentUser !== undefined && currentUser?.school}
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
              <div className="w-1/2 px-4">
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
              </div>
              <div className="w-1/2 px-4">
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
              </div>
            </div>
            <div className="flex mt-3">
              <div className="w-1/2 px-4">
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
              </div>
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

            <div className="flex mt-3">
              <div className="w-1/2 px-4">
                <p className="text-xs font-semibold ml-2 mb-1">School</p>
                <select
                  id="school"
                  name="school"
                  className="border-none pl-3 pr-10 p-0 outline-none ring-0 bg-ghost flex-grow appearance-none h-6 relative focus:ring-primary focus:border-primary focus:z-10 block w-full border  placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
                  value={
                    profile?.school_id ? profile.school_id : currentUser?.school
                  }
                  onChange={(e) => {
                    handleEdit(
                      "school",
                      e.target.options[e.target.selectedIndex].text
                    );
                    handleEdit("school_id", e.target.value);
                  }}
                >
                  {!authLoading &&
                    schools &&
                    schools.map((school) => (
                      <option key={school.name} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                </select>
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
                      : currentUser?.description
                  }
                  placeholder="Add a description about you"
                  onChange={(e) => handleEdit("description", e.target.value)}
                />
              </div>
              <div className="mt-3 flex flex-col">
                <p className="font-semibold text-l text-primary ml-4">
                  Interests
                </p>

                <div className="mt-2 ml-3 flex flex-wrap overflow-auto">
                  {skills?.map((skill, index) => (
                    <Chip
                      key={index + "-chip"}
                      label={skill}
                      onClick={() =>
                        setSkills(skills.filter((_skill, i) => i !== index))
                      }
                    />
                  ))}
                </div>
                <div className="relative inline-block">
                  <button
                    onClick={() => setShowMenu(true)}
                    className="flex rounded-full px-[6px] py-[2px] text-xs mt-2 text-gray-400 hover:bg-gray-200"
                  >
                    <img
                      className="h-3 mt-[2px] mr-[2px]"
                      src={plus}
                      alt="add"
                    />
                    add interest
                  </button>
                  {showMenu && (
                    <Menu
                      ref={ref}
                      setShowMenu={setShowMenu}
                      setSkills={setSkills}
                      skills={skills}
                      options={interests.filter((x) => !skills.includes(x))}
                    />
                  )}
                </div>
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

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
