import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import { weekday, month, getHours } from "./dates";
import { PostingContext } from "../../context/PostingContext";

function ClosedPosting() {
  const [posting, setPosting] = useState();
  const [postDate, setPostDate] = useState();
  const [timeslots, setTimeslots] = useState();
  const { closedPostings, postingLoading, updateStatus } =
    useContext(PostingContext);
  const { currentUser } = useContext(AuthContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postingLoading) {
      const signTimeslots = [];
      let first = true;
      closedPostings
        .filter((post) => post.id === parseInt(id))[0]
        ?.timeslots.map((x) => {
          if (
            x?.applicants.some(
              (app) => app.status === "selected" || app.status === "signed"
            ) > 0
          ) {
            signTimeslots.push({ ...x, selected: first ? true : false });
            first = false;
          }
        });
      setTimeslots(signTimeslots);
      setPostDate(
        new Date(
          closedPostings.filter((post) => post.id === parseInt(id))[0]?.date
        )
      );
      setPosting(closedPostings.filter((post) => post.id === parseInt(id))[0]);
    }
  }, [postingLoading, closedPostings]);

  return (
    <Page>
      <div>
        <button
          className="absolute right-10 text-sm font-semibold text-gray-700"
          onClick={() => navigate("../postings")}
        >
          {"< "}Go back
        </button>
      </div>
      <div className="relative bg-white rounded-xl shadow-md p-8 mt-8 w-full h-full min-h-0">
        {postingLoading ? (
          <Loading />
        ) : (
          <div className="flex justify-between">
            <div className="flex overflow-auto">
              {currentUser?.image !== "" ? (
                <img
                  className="z-10 mr-2 w-10 h-10 relative flex shadow-lg justify-center items-center rounded-full"
                  src={currentUser?.image}
                />
              ) : (
                <div className="z-10 mr-2 w-10 h-10 relative flex shadow-md justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                  {posting?.name[0] + posting?.name[0]}
                </div>
              )}
              <div className="ml-1">
                <p className="text-l font-semibold">{posting?.title}</p>
                <p className="text-sm font-semibold text-gray-500">
                  {posting?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {currentUser?.location}, ON
                </p>
              </div>
            </div>
          </div>
        )}
        {postingLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col min-h-0 h-[40%]">
              <p className="font-semibold text-l mt-6 text-primary ml-3 h-6">
                Posting Details
              </p>
              <div className="flex justify-between h-full overflow-auto">
                <div className="flex flex-col w-full pr-10">
                  <div className="flex justify-start">
                    <div className="px-4 mb-2">
                      <p className="text-xs font-semibold mb-1 mt-2">
                        Event Date
                      </p>
                      <p className="text-xs">
                        {postDate &&
                          `${weekday[postDate.getDay()]}, ${
                            month[postDate.getMonth()]
                          } ${postDate.getDate()}, ${postDate.getFullYear()}`}
                      </p>
                    </div>
                    <div className="ml-10 px-4 mb-2">
                      <p className="text-xs font-semibold mb-1 mt-2">
                        Event Location
                      </p>
                      <p className="text-xs">{posting?.location}</p>
                    </div>
                  </div>

                  <p className="text-xs font-semibold ml-4">Description</p>
                  <div className="flex-grow h-full w-full px-4 bg-ghost border-0 text-xs overflow-auto mt-2 py-1.5 rounded-md ml-3">
                    <p className="text-xs">{posting?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[30%]">
              <p className="font-semibold text-l mt-3 text-primary ml-3">
                Timeslots
              </p>
              <p className="font-semibold text-xs text-subText ml-3">
                Click blocks to view applicants for each timeslot to sign
              </p>
              <div className="overflow-auto flex flex-grow gap-4 mt-2 ml-3 h-full">
                <div className="w-[50%]">
                  {timeslots &&
                    timeslots.map((time, index) => {
                      let start_time = time.start_time;
                      let end_time = time.end_time;
                      if (time.start_time?.hours) {
                        start_time =
                          start_time.hours +
                          ":" +
                          start_time.minutes +
                          " " +
                          start_time.ampm;
                      }
                      if (time.end_time?.hours) {
                        end_time =
                          end_time.hours +
                          ":" +
                          end_time.minutes +
                          " " +
                          end_time.ampm;
                      }
                      const { hours, minutes } = getHours(start_time, end_time);
                      return (
                        <div
                          key={time.id}
                          className={`${
                            time.selected ? "bg-nav shadow-md" : "bg-ghost"
                          }  hover:cursor-pointer py-2 px-1 mb-2 rounded-md`}
                          onClick={() => {
                            let items = [...timeslots];
                            items = items.map((x) => {
                              x.selected = false;
                              return x;
                            });
                            items[index].selected = true;
                            setTimeslots(items);
                          }}
                        >
                          <p className="font-semibold text-xs  ml-3">
                            Time: {start_time} - {end_time}
                          </p>
                          <p className="font-semibold text-xs ml-3">
                            Participants: {time.applicants.length}
                          </p>
                          <p className="font-semibold text-xs  ml-3">
                            Number of Hours: {hours !== 0 && hours}{" "}
                            {minutes !== 0 && minutes}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className="h-full w-full flex-grow overflow-auto">
                  {timeslots &&
                  timeslots?.filter((time) => time.selected === true)[0]
                    ?.applicants.length > 0 ? (
                    timeslots
                      ?.filter((time) => time.selected == true)[0]
                      ?.applicants.map((applicant) => (
                        <div
                          key={applicant.email}
                          className={`${
                            applicant.status === "selected"
                              ? "bg-smoke"
                              : "bg-nav"
                          } flex justify-between rounded-md py-1 px-2 mb-2`}
                        >
                          <div>
                            <p className="text-xs font-semibold">
                              {applicant.first_name} {applicant.last_name}
                            </p>
                            <p className="text-xs">{applicant.email}</p>
                          </div>
                          <div className="flex">
                            {applicant.status === "selected" ? (
                              <div className="flex justify-center self-center items-center">
                                <button
                                  className="rounded-md px-2 py-1 text-xs text-white bg-yellow-200"
                                  onClick={() => {
                                    updateStatus(applicant.id, "signed");
                                  }}
                                >
                                  Sign
                                </button>
                              </div>
                            ) : (
                              <div className="flex  justify-center self-center items-center rounded-full w-7 h-7">
                                <i className="text-gray-600 fa-solid fa-circle-check" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="w-full h-full flex justify-center items-center bg-smoke rounded-md">
                      <p className="text-sm">
                        There are no applicants for this timeslot
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Page>
  );
}

ClosedPosting.propTypes = {};

export default ClosedPosting;
