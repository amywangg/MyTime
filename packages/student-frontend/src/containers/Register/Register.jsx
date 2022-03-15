import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api";
function Register() {
  const {
    register: registerContext,
    error,
    getSchools,
    authLoading,
  } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [schools, setSchools] = useState(null);
  const [message, setMessage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  useEffect(() => {
    getSchools().then((res) => setSchools(res.data));
  }, []);

  const onSubmit = (data) => {
    registerContext({
      email: data.email,
      first_name: data.first_name,
      middle_name: data.middle_name || "",
      last_name: data.last_name,
      password: password,
      student_id: data.student_id,
      school: schools[data.school].name,
      school_id: schools[data.school].id,
      date_of_birth: startDate,
    });
    setTimeout(() => {
      setMessage(null);
      navigate("/");
      window.location.reload();
    }, [2000]);
    setMessage("Successfully Registered");
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {message ||
        (error && (
          <Toast
            message={error ? "E-mail in use" : message}
            setMessage={setMessage}
            type={error ? "error" : "success"}
          />
        ))}
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* TODO: LOGO HERE */}
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:text-secondary"
            >
              Sign in
            </a>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 gap-3"
        >
          <div className="rounded-md shadow-sm grid gap-2">
            <input
              {...register("email")}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-basic"
              placeholder="Email address"
            />
            <div className="flex">
              <input
                {...register("first_name")}
                id="first-name"
                name="first_name"
                required
                className="input-basic"
                placeholder="First Name"
              />
              <input
                {...register("middle_name")}
                id="middle-name"
                name="middle_name"
                className="input-basic ml-2"
                placeholder="Middle Name (opt)"
              />
              <input
                {...register("last_name")}
                id="last-name"
                name="last_name"
                required
                className="input-basic ml-2"
                placeholder="Last Name"
              />
            </div>
            <div>
              <DatePicker
                selected={startDate}
                className="w-full relative block border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                onChange={(date) => setStartDate(date)}
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={30}
                scrollableYearDropdown
              />
            </div>

            <input
              {...register("student_id")}
              id="student_id"
              name="student_id"
              required
              className="input-basic"
              placeholder="Student ID"
            />
            <select
              {...register("school")}
              id="school"
              name="school"
              required
              className="input-basic"
              placeholder="Name of School"
            >
              {!authLoading &&
                schools &&
                schools.map((school, index) => (
                  <option key={school.name} value={index}>
                    {school.name}
                  </option>
                ))}
            </select>
            <div className="-space-y-px mt-2 relative">
              <input
                data-tooltip-target="tooltip-default"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <input
                id="password-again"
                name="password-again"
                type="password"
                onChange={(e) => setPasswordAgain(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Re-type Password"
              />

              {password !== "" && (
                <div className="absolute top-0 right-[-250px] z-20 text-xs bg-white p-2 shadow-sm rounded-md">
                  <PasswordChecklist
                    rules={["minLength", "number", "capital", "match"]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                  />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Sign up
          </button>

          {/* <GoogleButton /> */}
        </form>
      </div>
    </div>
  );
}

export default Register;
