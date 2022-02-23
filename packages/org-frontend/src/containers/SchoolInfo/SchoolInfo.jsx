import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import GoogleButton from "./GoogleButton";

function SchoolInfo() {
  const { register, handleSubmit } = useForm();
  const [schoolInfo, setSchoolInfo] = useState({});

  const onSubmit = (data) =>
    setSchoolInfo({
      student_id: data.student_id,
      school: data.school,
      grade: data.grade,
    });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* TODO: LOGO HERE */}
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            School Information
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 gap-3"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm grid gap-2">
            <input
              {...register("school")}
              id="school"
              name="school"
              required
              className="input-basic"
              placeholder="Name of School"
            />
            <input
              {...register("student_id")}
              id="student-id"
              name="student_id"
              required
              className="input-basic"
              placeholder="Student ID"
            />
            <input
              {...register("grade")}
              id="grade"
              name="grade"
              className="input-basic"
              placeholder="Grade"
            />
          </div>

          <button
            type="submit"
            className="relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default SchoolInfo;
