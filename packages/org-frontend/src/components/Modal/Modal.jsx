import React from "react";
import Button from "../Button";

export default function Modal({ title, content, setShowModal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/4 h-3/4 my-6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
              <p className="text-l font-semibold">{title}</p>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 leading-relaxed text-xs">
                {content}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
              <Button
                type="button"
                label="Close"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
