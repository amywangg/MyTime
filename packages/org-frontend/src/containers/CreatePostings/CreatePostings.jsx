import React, { useContext, useEffect, useState } from "react";
import NoJobs from "../../components/NoJobs";
import { set, useForm } from "react-hook-form";
import Page from "../../components/Page";
import Tabs from "../../components/Tabs";
import { PostingContext } from "../../context/PostingContext";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "../../components/TimePicker/TimePicker";
import AddTimeslots from "./AddTimeslots";
import Toast from "../../components/Toast";
import { useNavigate } from "react-router-dom";

function CreatePostings() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [timeslots, setTimeslots] = useState([
    {
      startTime: {
        hours: "8",
        minutes: "00",
        ampm: "am",
      },
      endTime: {
        hours: "5",
        minutes: "00",
        ampm: "pm",
      },
      openings: "",
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [addTimeslots, setAddTimeslots] = useState(false);
  const { createPosting } = useContext(PostingContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
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
  const handleOpeningChange = (value) => {
    if (value > 20) {
      value = 20;
    }
    let items = [...timeslots];
    let item = { ...timeslots[0] };
    item.openings = value;
    items[0] = item;
    setTimeslots(items);
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
      <div className="relative bg-white rounded-lg flex flex-col p-6 w-full flex-grow">
        {addTimeslots && (
          <AddTimeslots
            timeslots={timeslots}
            setTimeslots={setTimeslots}
            setShowModal={setAddTimeslots}
          />
        )}
        <div className="flex justify-between mb-4">
          <p>Job Title *</p>
          <input
            {...register("name")}
            id="name"
            name="name"
            required
            className="w-4/5 appearance-none px-2 h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
          />
        </div>
        <div className="flex justify-between mb-4">
          <p>Address *</p>
          <input
            {...register("location")}
            id="location"
            name="location"
            required
            className="w-4/5 px-2 appearance-none h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
          />
        </div>
        <div className="flex justify-between mb-4">
          <p>Date *</p>
          <div className="w-4/5">
            <DatePicker
              required
              className="w-full relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="flex mb-4 justify-between">
          <p>Start/End Time *</p>
          <div className="w-4/5 flex">
            <TimePicker
              required
              time={timeslots}
              setTime={setTimeslots}
              field="startTime"
              index={0}
            />
            <p className="text-xl mt-1 mx-5">-</p>
            <TimePicker
              required
              time={timeslots}
              setTime={setTimeslots}
              field="endTime"
              index={0}
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <p># of Openings *</p>
          <div className="w-4/5 flex">
            <input
              onChange={(e) => handleOpeningChange(e.target.value)}
              id="openings"
              name="openings"
              type="number"
              min="1"
              max="20"
              value={timeslots[0].openings}
              required
              className="w-[80%] px-2 appearance-none h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
            <button
              className="rounded-lg border-[1px] ml-4 h-[30px] border-primary text-primary px-3 text-xs py-0 hover:bg-primary hover:text-white whitespace-nowrap"
              onClick={() => {
                setAddTimeslots(true);
                setTimeslots([
                  ...timeslots,
                  {
                    startTime: {
                      hours: "8",
                      minutes: "00",
                      ampm: "am",
                    },
                    endTime: {
                      hours: "5",
                      minutes: "00",
                      ampm: "pm",
                    },
                    openings: "",
                  },
                ]);
              }}
            >
              + Timeslots
            </button>
          </div>
        </div>

        <div className="flex justify-between flex-grow">
          <p>Description *</p>
          <textarea
            required
            {...register("description")}
            className="w-4/5 mb-4 resize-none  block mt-2 overflow-auto px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border-solid transition ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            id="exampleFormControlTextarea1"
            placeholder="Add a description"
          />
        </div>

        <div className="flex justify-end ">
          <button
            className="font-semibold mr-5 text-sm text-gray-500 hover:text-black"
            onClick={() => navigate("/postings")}
          >
            {"<"} Go Back
          </button>
          <Button onClick={handleSubmit(onSubmit)} label="Save" />
        </div>
      </div>
    </Page>
  );
}

CreatePostings.propTypes = {};

export default CreatePostings;
