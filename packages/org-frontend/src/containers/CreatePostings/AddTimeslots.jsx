import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "../../components/TimePicker/TimePicker";

export default function AddTimeslots({ timeslots, setTimeslots }) {
  const handleOpeningChange = (value, index) => {
    if (value > 20) {
      value = 20;
    }
    let items = [...timeslots];
    let item = { ...timeslots[index] };
    item.openings = value;
    items[index] = item;
    console.log(items);
    setTimeslots(items);
  };

  const handleRemove = (index) => {
    const newTimeslots = timeslots.filter((time, i) => i !== index);
    setTimeslots(newTimeslots);
  };

  return (
    <div className="max-h-[45%] overflow-auto min-h-0">
      <div className="relative flex-auto">
        {timeslots.map((time, index) => (
          <div key={index + "-timeslots"}>
            <div className="flex mb-4 justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Start/End Time *
              </p>
              <div className="w-4/5 flex">
                <TimePicker
                  required
                  time={timeslots}
                  setTime={setTimeslots}
                  field="startTime"
                  index={index}
                />
                <p className="text-xl mt-1 mx-5">-</p>
                <TimePicker
                  required
                  time={timeslots}
                  setTime={setTimeslots}
                  field="endTime"
                  index={index}
                />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600">
                # of Openings *
              </p>
              <div className="w-4/5 flex">
                <input
                  id="openings"
                  name="openings"
                  type="number"
                  min="1"
                  max="20"
                  value={time.openings}
                  onChange={(e) => handleOpeningChange(e.target.value, index)}
                  required
                  className="w-[80%] px-2 appearance-none h-8 relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {index !== 0 && (
                  <button
                    className="rounded-lg border-[1px] ml-4 h-[30px] border-red-400 text-red-400 px-3 text-xs py-0 hover:bg-red-400 hover:text-white whitespace-nowrap"
                    onClick={() => handleRemove(index)}
                  >
                    - Remove
                  </button>
                )}
                {index === timeslots.length - 1 && (
                  <button
                    className="rounded-lg border-[1px] ml-4 h-[30px] border-primary text-primary px-3 text-xs py-0 hover:bg-primary hover:text-white whitespace-nowrap"
                    onClick={() =>
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
                      ])
                    }
                  >
                    + Add Timeslot
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
