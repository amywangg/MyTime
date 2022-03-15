import React from "react";

function Progress() {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full mb-10">
      <p className="inline-block font-semibold text-xl mb-2">Your Progress</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        As per the Ontario Ministry of Education, each student must complete 40
        hours of volunteer work to earn their Ontario Secondary School Diploma
      </p>
      <div className="w-full h-12 bg-white rounded-full shadow-mddark:bg-secondary border-[1px] border-gray-400 mb-[10px]">
        <div className="bg-tertiary h-full cursor-pointer rounded-full hover:bg-primary w-[45%] border-r-[1px] border-black relative">
          <div className="absolute right-4 text-right py-2">
            <p className="text-xs font-semibold">30h 2m</p>
            <p className="text-xs font-semibold">45%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Progress.propTypes = {};

export default Progress;
