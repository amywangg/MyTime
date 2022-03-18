import React, { useState, useEffect, useContext } from "react";
import { PostingContext } from "../../context/PostingContext";
import { getHours } from "../Posting/dates";

function Progress() {
  const [completedTime, setCompletedTime] = useState(0);
  const { postings, completePostings, postingLoading, generatePdf } =
    useContext(PostingContext);

  useEffect(() => {
    if (!postingLoading) {
      let searchResults = [];
      searchResults = completePostings.filter((post) =>
        post.timeslots.some((time) => time.student_status?.status === "signed")
      );
      let totalHours = 0;
      let totalMinutes = 0;
      searchResults.map((post) =>
        post.timeslots.map((time) => {
          if (time.student_status.status === "signed") {
            let timeElapsed = getHours(time.start_time, time.end_time);
            totalHours += timeElapsed.hours;
            totalMinutes += timeElapsed.minutes;
          }
        })
      );
      setCompletedTime({
        hours: totalHours,
        minutes: totalMinutes,
        percent: Math.round(
          ((totalHours * 60 + totalMinutes) / (40 * 60)) * 100
        ),
      });
    }
  }, [postingLoading, postings]);

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full mb-10">
      <p className="inline-block font-semibold text-xl mb-2">Your Progress</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        As per the Ontario Ministry of Education, each student must complete 40
        hours of volunteer work to earn their Ontario Secondary School Diploma
      </p>
      <div className="w-full h-12 bg-white rounded-full shadow-mddark:bg-secondary border-[1px] border-gray-400 mb-[10px]">
        {completedTime.percent === 0 ? (
          <div className="w-full h-full flex justify-start items-center ml-6 text-xs font-semibold">
            No hours complete
          </div>
        ) : (
          <div
            className={`bg-tertiary h-full cursor-pointer rounded-full hover:bg-primary border-r-[1px] border-black relative`}
            style={{
              width:
                completedTime.percent < 15
                  ? "15%"
                  : completedTime.percent + "%",
            }}
          >
            <div className="absolute right-4 text-right py-2">
              <p className="text-xs font-semibold">
                {completedTime.hours}h {completedTime.minutes}m
              </p>
              <p className="text-xs font-semibold">{completedTime.percent}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Progress.propTypes = {};

export default Progress;
