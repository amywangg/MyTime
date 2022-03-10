import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "../../components/TimePicker/TimePicker";

export default function AddTimeslots({
  timeslots,
  setTimeslots,
  setShowModal,
}) {
  const [originalTimeslots, setOriginalTimeslots] = useState(timeslots);

  const handleOpeningChange = (value, index) => {
    if (value > 20) {
      value = 20;
    }
    let items = [...timeslots];
    let item = { ...timeslots[index + 1] };
    item.openings = value;
    items[index + 1] = item;
    setTimeslots(items);
  };

  const handleRemove = (index) => {
    console.log(index);
    const newTimeslots = timeslots.filter((time, i) => i !== index);
    setTimeslots(newTimeslots);
  };

  const handleSave = () => {
    const newTimeslots = timeslots.filter(
      (time, i) => i === 0 || time.openings !== ""
    );
    setTimeslots(newTimeslots);
    setShowModal(false);
  };

  const handleCancel = () => {
    setTimeslots(originalTimeslots);
    setShowModal(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none overflow-auto max-h-[90%]">
        <div className="relative w-[60%] ml-36 h-3/4 my-6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
              <p className="text-l font-semibold">Add More Timeslots</p>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {timeslots.slice(1).map((time, index) => (
                <div key={index + "-timeslots"}>
                  <div className="flex mb-4 justify-between">
                    <p>Start/End Time *</p>
                    <div className="w-4/5 flex">
                      <TimePicker
                        required
                        time={timeslots}
                        setTime={setTimeslots}
                        field="start_time"
                        index={index}
                      />
                      <p className="text-xl mt-1 mx-5">-</p>
                      <TimePicker
                        required
                        time={timeslots}
                        setTime={setTimeslots}
                        field="end_time"
                        index={index}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p># of Openings *</p>
                    <div className="w-4/5 flex">
                      <input
                        id="openings"
                        name="openings"
                        type="number"
                        min="1"
                        max="20"
                        value={time.openings}
                        onChange={(e) =>
                          handleOpeningChange(e.target.value, index)
                        }
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
                      {index === timeslots.length - 2 && (
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
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="rounded-lg border-[1px] ml-4 h-[30px] border-red-400 text-red-400 px-3 text-xs py-0 hover:bg-red-400 hover:text-white whitespace-nowrap"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <Button type="button" label="Save" onClick={handleSave} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
