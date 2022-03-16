import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import { weekday, month, getHours } from "./dates";
import { PostingContext } from "../../context/PostingContext";

function Posting() {
  const [posting, setPosting] = useState();
  const [postDate, setPostDate] = useState();
  const [timeslots, setTimeslots] = useState();
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState(null);
  const { postings, postingLoading, updateSave, updateStatus } =
    useContext(PostingContext);
  const { currentUser } = useContext(AuthContext);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postingLoading) {
      setTimeslots(
        postings
          .filter((post) => post.id === parseInt(id))[0]
          ?.timeslots.map((x, index) => {
            if (index === 0) {
              return { ...x, selected: true };
            }
            return { ...x, selected: false };
          })
      );
      setPostDate(
        new Date(postings.filter((post) => post.id === parseInt(id))[0]?.date)
      );
      setPosting(postings.filter((post) => post.id === parseInt(id))[0]);
    }
  }, [postingLoading]);

  const onSubmit = () => {
    const selectedTimeslots = timeslots.filter((x) => x.selected);
    if (selectedTimeslots.length > 0) {
      updateStatus(posting.id, timeslots);
      setMessage("Successfully applied! Check back for updates");
      setTimeout(() => {
        setMessage(null);
      }, [2000]);
    } else {
      setMessage("Error please select at least 1 timeslot");
      setTimeout(() => {
        setMessage(null);
      }, [2000]);
    }
  };

  const onUpdate = () => {
    updateStatus(posting.id, timeslots);
    setMessage("Successfully updated!");
    setTimeout(() => {
      setMessage(null);
    }, [2000]);
  };

  return (
    <Page>
      <div>
        <button
          className="absolute right-10 text-sm font-semibold text-gray-700"
          onClick={() => navigate(-1)}
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
                  className="z-10 mr-2 w-20 h-20 relative flex shadow-lg justify-center items-center rounded-full"
                  src={currentUser?.image}
                />
              ) : (
                <div className="z-10 mr-2 w-20 h-20 relative flex shadow-md justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                  {posting?.name[0] + posting?.name[0]}
                </div>
              )}
              <div className="mt-3 ml-4">
                <p className="text-xl font-semibold">{posting?.title}</p>
                <p className="text-sm font-semibold text-gray-500">
                  {posting?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {currentUser?.location}, ON
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex justify-center self-center items-center mr-3">
                <button
                  className="absolute right-10 top-10 text-gray-600 hover:text-primary underline text-sm "
                  onClick={() => {
                    navigate(`/postings/${posting.id}/edit`);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
        {postingLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col min-h-0 h-[50%]">
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
            <div>
              <p className="font-semibold text-l mt-3 text-primary ml-3">
                Timeslots
              </p>
              <p className="font-semibold text-xs text-subText ml-3">
                Click blocks to view applicants for each timeslot
              </p>
              <div className="overflow-auto flex flex-grow gap-4 mt-2 ml-3">
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
                            time.selected ? "bg-nav shadow-lg" : "bg-ghost"
                          }  hover:cursor-pointer py-2 px-1`}
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
                            Openings: {time.openings}
                          </p>
                          <p className="font-semibold text-xs  ml-3">
                            Number of Hours: {hours !== 0 && hours}{" "}
                            {minutes !== 0 && minutes}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className="bg-ghost h-full w-full flex-grow">
                  Applicants
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Page>
  );
}

Posting.propTypes = {};

export default Posting;
