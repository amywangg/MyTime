import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import Page from "../../components/Page";
import { PostingContext } from "../../context/PostingContext";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddTimeslots from "./AddTimeslots";
import Toast from "../../components/Toast";
import { useNavigate } from "react-router-dom";

function CreatePostings() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [timeslots, setTimeslots] = useState([
    {
      start_time: {
        hours: "8",
        minutes: "00",
        ampm: "am",
      },
      end_time: {
        hours: "5",
        minutes: "00",
        ampm: "pm",
      },
      openings: "",
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const { createPosting } = useContext(PostingContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newTimeslots = timeslots.filter(
      (time, i) => i === 0 || time.openings !== ""
    );
    setTimeslots(newTimeslots);

    if (
      data.name &&
      data.location &&
      data.description &&
      timeslots[0].openings &&
      startDate
    ) {
      createPosting({
        title: data.name,
        location: data.location,
        description: data.description,
        timeslots: timeslots,
        date: startDate,
      });
      setTimeout(() => {
        setMessage(null);
        navigate("/postings");
        window.location.reload();
      }, [2000]);
      setMessage("Successfully added");
    } else {
      setMessage("Error Missing required fields");
      setTimeout(() => {
        setMessage(null);
      }, [2000]);
    }
  };

  return (
    <Page title={"Create Posting"}>
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
        <div className="flex justify-between mb-4">
          <p className="text-sm font-semibold text-gray-600">Job Title *</p>
          <input
            {...register("name")}
            id="name"
            name="name"
            required
            className="w-4/5 appearance-none px-2 h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
          />
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-semibold text-gray-600">Address *</p>
          <input
            {...register("location")}
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
          <p className="text-sm font-semibold text-gray-600">Description *</p>
          <textarea
            required
            {...register("description")}
            className="w-4/5 mb-4 resize-none  block mt-2 overflow-auto px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            id="exampleFormControlTextarea1"
            placeholder="Add a description"
          />
        </div>
        <p className="text-l font-semibold mb-2">Timeslots</p>
        <AddTimeslots timeslots={timeslots} setTimeslots={setTimeslots} />
        <div className="flex justify-end mt-2">
          <Button onClick={handleSubmit(onSubmit)} label="Save Posting" />
        </div>
      </div>
    </Page>
  );
}

CreatePostings.propTypes = {};

export default CreatePostings;
