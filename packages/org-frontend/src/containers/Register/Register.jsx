import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import GoogleButton from "./GoogleButton";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/Modal";

function Register() {
  const [terms, setTerms] = useState();
  const { register: registerContext, error } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    if (data.accept_terms) {
      registerContext({
        name: data.name,
        email: data.email,
        location: data.location,
        website: data.website,
        phone_number: data.phone_number,
        password: password,
      });
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-0">
      {terms === true && (
        <Modal
          title="Terms and Conditions"
          content="I AM TERMS AND CONDITIONS"
          setShowModal={setTerms}
        />
      )}
      <div className="max-w-md w-full space-y-8 z-0">
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
              {...register("name")}
              id="name"
              name="name"
              required
              className="input-basic"
              placeholder="Name of Organization"
            />
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
            <input
              {...register("location")}
              id="location"
              name="location"
              required
              className="input-basic"
              placeholder="City"
            />
            <input
              {...register("website")}
              id="website"
              name="website"
              required
              className="input-basic"
              placeholder="Website"
            />
            <input
              {...register("phone_number", {
                pattern:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
              })}
              id="phone_number"
              name="phone_number"
              required
              className="input-basic"
              placeholder="Phone Number"
            />
            {errors.phone_number && (
              <p className="text-red-400 text-xs">
                Incorrect Phone number format
              </p>
            )}

            <div className="-space-y-px mt-2">
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
                <div>
                  <PasswordChecklist
                    rules={["minLength", "number", "capital", "match"]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                  />
                </div>
              )}
              {error && <div className="text-red-300">E-mail in use</div>}
            </div>
          </div>
          <div className="flex ml-2">
            <input
              type="checkbox"
              disabled={terms === null || terms === undefined}
              className={`rounded-sm text-primary ${
                terms === false ? "border-red-400 border-2" : "border-gray-400"
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
          <div
            className="or-divider"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <p
              className="font-bold text-gray-500 rounded-full bg-gray-50 flex items-center justify-center text-sm"
              style={{ height: 10, width: 50 }}
            >
              or
            </p>
          </div>
          <GoogleButton />
        </form>
      </div>
    </div>
  );
}

export default Register;
