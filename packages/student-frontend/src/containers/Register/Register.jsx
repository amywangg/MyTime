import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../components/Modal";
import student from "../../assets/students.jpeg";
import mytime from "../../assets/mytime.png";

function Register() {
  const {
    register: registerContext,
    getSchools,
    authLoading,
  } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [schools, setSchools] = useState(null);
  const [terms, setTerms] = useState(false);
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
    <div className="min-h-full flex">
      <div
        className="w-[60%]"
        style={{
          backgroundImage: `linear-gradient(rgba(235,248,233, 0.9), rgba(0, 0, 0, 0.4)), url(${student})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="w-[40%] min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 z-0">
        {terms === true && (
          <Modal
            title="Terms and Conditions"
            content="I AM TERMS AND CONDITIONS"
            setShowModal={setTerms}
          />
        )}
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mb-4 max-w-[100%] w-40 block mx-auto"
              src={mytime}
              alt="logo"
            />
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
                  <div className="absolute top-0 left-[-250px] z-20 text-xs bg-white p-2 shadow-lg rounded-md">
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
            <div className="flex ml-2 mb-10">
              <input
                type="checkbox"
                disabled={terms === null || terms === undefined}
                className={`rounded-sm text-primary ${
                  terms === false
                    ? "border-red-400 border-2"
                    : "border-gray-400"
                } focus:ring-primary focus:checked:border-primary focus:checked:bg-primary checked:bg-primary checked:ring-primary`}
                placeholder="accept_terms"
                required
                {...register("accept_terms")}
              />
              <p className="ml-2 mt-[-4px]">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-primary"
                  onClick={() => setTerms(true)}
                >
                  Terms and Conditions
                </button>
              </p>
            </div>
            <button
              type="submit"
              className="relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
