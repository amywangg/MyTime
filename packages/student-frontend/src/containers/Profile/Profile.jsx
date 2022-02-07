import React, { useContext } from "react";
import Page from "../../components/Page";
import EditButton from "../../components/EditButton/Button";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Page>
      <div className="bg-white rounded-lg flex flex-col p-8 mt-20 w-full flex-grow">
        <div className="mt-[-4rem] mr-2 w-28 h-28 relative flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase border-4 border-white">
          {currentUser !== undefined &&
            currentUser?.first_name[0] + currentUser?.last_name[0]}
        </div>
        <div>
          <p>
            {currentUser !== undefined &&
              currentUser?.first_name + " " + currentUser?.last_name}
          </p>
          <EditButton />
        </div>
      </div>
    </Page>
  );
}

Profile.propTypes = {};

export default Profile;
