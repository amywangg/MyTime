import React, { useState } from "react";
import Page from "../../components/Page";
import Calendar from "react-calendar";

function Schedule() {
  const [value, setValue] = useState(new Date());
  var date = new Date();

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <Page title="Schedule">
      <div className="bg-white rounded-lg flex flex-col p-8 h-[100%] w-full flex-grow">
        <Calendar
          onChange={onChange}
          value={value}
          className="h-[100%] text-small"
          minDetail="month"
          maxDetail="month"
          minDate={
            new Date(date.getFullYear() - 3, date.getMonth(), date.getDate())
          }
          calendarType="US"
          maxDate={
            new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
          }
          navigationLabel={({ label }) => (
            <p className="font-semibold text-xs mx-4 mb-5">{label}</p>
          )}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString("en", { weekday: "long" })
          }
          tileClassName="border-[1px] w-6 h-20"
          nextLabel={<p className="text-xs font-semibold">{">"}</p>}
          prevLabel={<p className="text-xs font-semibold">{"<"}</p>}
          next2Label={<p className="text-xs font-semibold ml-2">{">>"}</p>}
          prev2Label={<p className="text-xs font-semibold mr-2">{"<<"}</p>}
          showNeighboringMonth={false}
          view="month"
        />
      </div>
    </Page>
  );
}

Schedule.propTypes = {};

export default Schedule;
