import React, { useState, useContext, useEffect } from "react";
import Listing from "../../components/Listing/Listing";
import NoJobs from "../../components/NoJobs";
import partnership from "../../assets/partnership.png";
import { useNavigate } from "react-router-dom";
import { SchoolContext } from "../../context/SchoolContext";
import Loading from "../../components/Loading";

function PartnerAction() {
  return (
    <div className="flex py-4 mr-2">
      <img className="h-5 w-5 mr-4" src={partnership} alt="partnership" />
    </div>
  );
}

function Partnerships() {
  const [filteredSchools, setFilteredSchools] = useState([]);
  const { schools, schoolLoading } = useContext(SchoolContext);
  const navigate = useNavigate();

  const onSchoolClick = (id) => {
    navigate(`/school/${id}`);
  };

  useEffect(() => {
    console.log(schoolLoading);
    if (!schoolLoading && schools !== null) {
      console.log(schools);
      setFilteredSchools(
        schools.filter((school) => school.status === "verified") || []
      );
    }
  }, [schoolLoading]);

  return (
    <div className="bg-white rounded-lg flex flex-col p-8 w-full flex-grow pt-8 overflow-auto">
      <p className="inline-block font-medium text-xl mb-2">Your Partnerships</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        Here are the schools who have verified you!
      </p>
      {schoolLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : filteredSchools.length !== 0 ? (
        filteredSchools.map((school, i) => (
          <Listing
            item={school}
            key={i}
            br={i !== filteredSchools.length - 1}
            onClick={() => onSchoolClick(school.id)}
            action={<PartnerAction />}
          />
        ))
      ) : (
        <NoJobs
          message1={"No Schools have verified you yet!"}
          message2="Sit tight or reach out to a school near you."
        />
      )}
    </div>
  );
}

Partnerships.propTypes = {};

export default Partnerships;
