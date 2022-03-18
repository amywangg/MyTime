import React, { useState, useContext, useEffect } from "react";
import Page from "../../components/Page";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { PostingContext } from "../../context/PostingContext";
import { getHours } from "../Posting/dates";
import "./calendar.css";

function Schedule() {
  const [value, setValue] = useState(new Date());
  const [timeslot, setTimeslot] = useState(null);
  const [dateClick, setDateClick] = useState(false);
  const navigate = useNavigate();

  var date = new Date();
  const [filteredPostings, setFilteredPostings] = useState([]);
  const { postings, completePostings, postingLoading } =
    useContext(PostingContext);

  useEffect(() => {
    if (!postingLoading) {
      const pendingPostings = [];
      postings.map((posting) => {
        const temp = posting.timeslots.filter(
          (time) => time.student_status?.status == "selected"
        );
        if (temp.length > 0) {
          pendingPostings.push({
            id: posting.id,
            completed: false,
            title: posting.title,
            date: posting.date,
            timeslots: temp,
          });
        }
      });

      completePostings.map((posting) => {
        const temp = posting.timeslots.filter(
          (time) =>
            time.student_status?.status == "selected" ||
            time.student_status?.status == "signed"
        );
        if (temp.length > 0) {
          pendingPostings.push({
            id: posting.id,
            completed: true,
            title: posting.title,
            date: posting.date,
            timeslots: temp,
          });
        }
      });
      const dates = filteredPostings.filter((post) => {
        let calDate = new Date(value);
        let postDate = new Date(post.date);
        return calDate.getDate() === postDate.getDate() &&
          calDate.getMonth() === postDate.getMonth()
          ? true
          : false;
      });
      setTimeslot(dates);
      setFilteredPostings(pendingPostings);
    }
  }, [postingLoading]);

  function onChange(nextValue) {
    setDateClick(true);
    setTimeslot(null);
    const dates = filteredPostings.filter((post) => {
      let calDate = new Date(nextValue);
      let postDate = new Date(post.date);
      return calDate.getDate() === postDate.getDate() &&
        calDate.getMonth() === postDate.getMonth()
        ? true
        : false;
    });
    setTimeslot(dates);
    setValue(nextValue);
  }

  return (
    <Page title="Schedule">
      <div className="bg-white rounded-xl shadow-md flex flex-col p-8 h-[100%] w-full flex-grow">
        <Calendar
          onChange={onChange}
          value={value}
          className="h-[90%] text-small"
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={true}
          tileClassName={({ date, view }) => {
            if (
              new Date(date).getDate() === new Date().getDate() &&
              !dateClick
            ) {
              return "bg-nav border-[2px] border-white w-6 h-20 font-semibold bg-ghost place-content-end";
            } else {
              return "border-[2px] border-white w-6 h-20 font-semibold bg-ghost place-content-end";
            }
          }}
          tileContent={({ date, view }) => {
            const dates = filteredPostings.filter((post) => {
              let calDate = new Date(date);
              let postDate = new Date(post.date);
              return calDate.getDate() === postDate.getDate() &&
                calDate.getMonth() === postDate.getMonth()
                ? true
                : false;
            });
            if (dates.length > 0) {
              const isDateSelected =
                new Date(dates[0].date).getDate() === value.getDate() &&
                new Date(dates[0].date).getMonth() === value.getMonth();
              return dates.map((x) => (
                <div
                  key={x.title}
                  className={`overflow-hidden text-[8px] whitespace-nowrap ${
                    isDateSelected ? "bg-tertiary text-black" : "bg-nav"
                  } rounded-lg font-medium mb-1`}
                >
                  {x.title}
                </div>
              ));
            }
          }}
          minDate={
            new Date(date.getFullYear() - 3, date.getMonth(), date.getDate())
          }
          calendarType="US"
          maxDate={
            new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
          }
          navigationLabel={({ label }) => (
            <p className="font-semibold text-md mx-4 mb-5">{label}</p>
          )}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString("en", { weekday: "long" })
          }
          nextLabel={
            <div className="h-8 w-8 rounded-full hover:bg-gray-200 flex justify-center items-center">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          }
          prevLabel={
            <div className="h-8 w-8 rounded-full hover:bg-gray-200 flex justify-center items-center">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
          }
          next2Label={
            <div className="h-8 w-8 rounded-full hover:bg-gray-200 flex justify-center items-center ml-1">
              <i className="fa-solid fa-angles-right"></i>
            </div>
          }
          prev2Label={
            <div className="h-8 w-8 rounded-full hover:bg-gray-200 flex justify-center items-center mr-1">
              <i className="fa-solid fa-angles-left"></i>
            </div>
          }
          view="month"
        />
        <div className="flex overflow-x-auto">
          {timeslot?.length > 0 ? (
            timeslot.map((time) =>
              time.timeslots.map((x, index) => {
                let start_time = x.start_time;
                let end_time = x.end_time;
                if (x.start_time?.hours) {
                  start_time =
                    start_time.hours +
                    ":" +
                    start_time.minutes +
                    " " +
                    start_time.ampm;
                }
                if (x.end_time?.hours) {
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
                    key={time.title + index + "-time"}
                    className="bg-nav shadow-md py-2 px-1 mb-2 rounded-md mr-2 hover:cursor-pointer"
                    onClick={() =>
                      navigate(
                        `${
                          time.completed
                            ? "../postings/complete"
                            : "../browse/postings"
                        }/${time.id}`
                      )
                    }
                  >
                    <p className="font-semibold text-xs  ml-3 mr-3">
                      Time: {start_time} - {end_time}
                    </p>
                    <p className="font-semibold text-xs ml-3">
                      Status: {x?.student_status.status}
                    </p>
                    <p className="font-semibold text-xs  ml-3">
                      Number of Hours: {hours !== 0 && hours}{" "}
                      {minutes !== 0 && minutes}
                    </p>
                  </div>
                );
              })
            )
          ) : (
            <p className="text-sm ml-2">
              Click a date with an Event to see more details
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}

Schedule.propTypes = {};

export default Schedule;
