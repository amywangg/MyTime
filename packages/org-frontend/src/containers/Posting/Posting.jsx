import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import job from "../../assets/job.png";
import calendar from "../../assets/calendar.png";
import location from "../../assets/location.png";
import Loading from "../../components/Loading";
import NoJobs from "../../components/NoJobs";
import { weekday, month } from "./dates";
import { PostingContext } from "../../context/PostingContext";
import { AuthContext } from "../../context/AuthContext";

function Posting({ props }) {
  const [posting, setPosting] = useState();
  const [postDate, setPostDate] = useState();
  const { postings, postingLoading } = useContext(PostingContext);
  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postingLoading) {
      setPostDate(
        new Date(postings.filter((post) => post.id === parseInt(id))[0]?.date)
      );
      setPosting(postings.filter((post) => post.id === parseInt(id))[0]);
    }
  }, [postingLoading]);

  return (
    <Page>
      <div>
        <button
          className="absolute right-10 text-sm font-semibold text-gray-700"
          onClick={() => navigate("/postings")}
        >
          {"< "}Go back
        </button>
      </div>
      {currentUser?.image ? (
        <img
          className="z-10 mr-2 w-28 h-28 absolute ml-8 flex justify-center items-center rounded-full uppercase border-4 border-white bg-white"
          src={currentUser?.image}
          alt="avatar"
        />
      ) : (
        <div className="z-10 mr-2 w-28 h-28 absolute ml-8 flex justify-center items-center rounded-full uppercase border-4 border-white bg-white">
          {currentUser !== undefined &&
            currentUser.name.split(" ").map((x) => {
              return x[0];
            })}
        </div>
      )}
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-8 mt-12 w-full flex-grow no-scrollbar overflow-auto">
        {postingLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="pl-5">
            <button
              className="absolute right-10 top-10 text-gray-600 hover:text-primary underline text-sm "
              onClick={() => {
                navigate(`/postings/${posting.id}/edit`);
              }}
            >
              Edit
            </button>
            <div className="mt-12">
              <p className="text-2xl font-semibold">
                {posting !== undefined && posting?.title}
              </p>
            </div>
            <div className="flex w-[300px] mt-3">
              <img
                className="h-[24px] w-[20px] flex-none mr-[7px] ml-[-1px] pt-1"
                src={job}
                alt="job"
              />
              <p className="flex-grow mt-1">
                {currentUser !== undefined && currentUser?.name}
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
                {posting !== undefined && posting?.location + ", ON"}
              </p>
            </div>
            {/* date */}
            <div className="flex w-[300px]">
              <img
                className="h-[22px] flex-none mr-[8px] pt-1 mt-2"
                src={calendar}
                alt="calendar"
              />
              <p className="flex-grow mt-2">
                {postDate &&
                  `${weekday[postDate.getDay()]}, ${
                    month[postDate.getMonth()]
                  } ${postDate.getDate()}, ${postDate.getFullYear()}`}
              </p>
            </div>
            <div className="flex-grow items-center justify-center p-2 mt-6">
              {posting?.description ? (
                <p>
                  {posting?.description
                    ? posting.description
                    : posting !== undefined && posting?.description}
                </p>
              ) : (
                <NoJobs
                  message1="This posting hasn't put a description"
                  message2="Send an email to find out more"
                />
              )}
              <div className="flex-grow items-center justify-center mt-6">
                <p className="text-lg font-semibold">Applicants</p>

                {posting?.applicants.length === 0 ? (
                  <div className="mt-10 flex-grow">
                    <NoJobs
                      message1="No Applicants Yet!"
                      message2="Check back later"
                    />
                  </div>
                ) : (
                  <p className="text-sm">
                    Number of Applicants: {posting?.applicants.length}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

Posting.propTypes = {};

export default Posting;
