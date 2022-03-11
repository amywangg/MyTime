import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Page from "../../components/Page";
import { PostingContext } from "../../context/PostingContext";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "../../components/TimePicker/TimePicker";
import AddTimeslots from "./AddTimeslots";
import Toast from "../../components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function EditPosting() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [originalTimeslots, setOriginalTimeslots] = useState(0);
  const [timeslots, setTimeslots] = useState(null);
  const [startDate, setStartDate] = useState();
  const [posting, setPosting] = useState();
  const { register, handleSubmit } = useForm();
  const { postings, postingLoading, updatePosting } =
    useContext(PostingContext);
  let { id } = useParams();

  useEffect(() => {
    if (!postingLoading) {
      const postingObj = postings.filter((post) => post.id === parseInt(id))[0];
      const postTimeslots = postingObj?.timeslots;
      setOriginalTimeslots(postingObj?.timeslots.length);
      setStartDate(new Date(postingObj?.date));
      setPosting(postingObj);

      let newTime = postTimeslots?.map((time) => {
        var hours = Number(time.start_time.match(/^(\d+)/)[1]);
        var minutes = Number(time.start_time.match(/:(\d+)/)[1]);
        var ampm = time.start_time.match(/([AaPp][Mm])$/)[1];
        time.start_time = { hours, minutes, ampm };
        var hours = Number(time.end_time.match(/^(\d+)/)[1]);
        var minutes = Number(time.end_time.match(/:(\d+)/)[1]);
        var ampm = time.end_time.match(/([AaPp][Mm])$/)[1];
        time.end_time = { hours, minutes, ampm };
        return time;
      });
      setTimeslots(newTime);
    }
  }, [postingLoading]);

  const onSubmit = (data) => {
    const newTimeslots = timeslots.filter(
      (time, i) => i === 0 || time.openings !== ""
    );
    setTimeslots(newTimeslots);
    console.log(posting);
    if (
      posting.title &&
      posting.location &&
      posting.description &&
      timeslots[0]?.openings &&
      startDate
    ) {
      updatePosting({
        id: posting.id,
        title: posting.title,
        location: posting.location,
        description: posting.description,
        timeslots: timeslots,
        date: startDate,
        original_timeslots: originalTimeslots,
      });
      setTimeout(() => {
        setMessage(null);
        navigate(`/postings/${id}`);
        window.location.reload();
      }, [2000]);
      setMessage("Successfully updated");
    } else {
      setMessage("Error Missing required fields");
      setTimeout(() => {
        setMessage(null);
      }, [2000]);
    }
  };

  return (
    <Page title={"Edit Posting"}>
      <div>
        <button
          className="absolute top-10 right-12 text-sm font-semibold text-gray-700"
          onClick={() => navigate("/postings")}
        >
          {"< "}Go back
        </button>
      </div>
      {message && (
        <Toast
          message={message}
          setMessage={setMessage}
          type={message.includes("Error") ? "error" : "success"}
        />
      )}
      <div className="bg-white rounded-xl shadow-md flex flex-col p-6 w-full flex-1 min-h-0">
        {postingLoading || !timeslots ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600">Job Title *</p>
              <input
                value={posting.title}
                onChange={(e) =>
                  setPosting({ ...posting, title: e.target.value })
                }
                id="name"
                name="name"
                required
                className="w-4/5 appearance-none px-2 h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              />
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600">Address *</p>
              <input
                value={posting.location}
                onChange={(e) =>
                  setPosting({ ...posting, location: e.target.value })
                }
                id="location"
                name="location"
                required
                className="w-4/5 px-2 appearance-none h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              />
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600">Date *</p>
              <div className="w-4/5">
                <DatePicker
                  required
                  className="w-full relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="flex justify-between flex-grow">
              <p className="text-sm font-semibold text-gray-600">
                Description *
              </p>
              <textarea
                required
                value={posting.description}
                onChange={(e) =>
                  setPosting({ ...posting, description: e.target.value })
                }
                className="w-4/5 mb-4 resize-none  block mt-2 overflow-auto px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                id="exampleFormControlTextarea1"
                placeholder="Add a description"
              />
            </div>
            <p className="text-l font-semibold mb-2">Timeslots</p>
            <AddTimeslots timeslots={timeslots} setTimeslots={setTimeslots} />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-400 mr-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
              <Button onClick={handleSubmit(onSubmit)} label="Update" />
            </div>
          </>
        )}
      </div>
    </Page>
  );
}

EditPosting.propTypes = {};

export default EditPosting;
