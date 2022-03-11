import React from "react";

function Progress() {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full mb-10">
      <p className="inline-block font-medium text-xl mb-2">Your Progress</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        As per the Ontario Ministry of Education, each student must complete 40
        hours of volunteer work to earn their Ontario Secondary School Diploma
      </p>
      <div className="w-full h-12 bg-white rounded-full dark:bg-secondary border-[1px] border-black mb-[10px]">
        <div className="bg-tertiary h-full rounded-full dark:bg-secondary w-[45%] border-r-[1px] border-black relative">
          <div className="absolute right-4 text-right py-2">
            <p className="text-xs">30h 2m</p>
            <p className="text-xs">45%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Progress.propTypes = {};

export default Progress;
