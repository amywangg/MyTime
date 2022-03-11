import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import GoogleButton from "./GoogleButton";

function GoogleRegister() {
  const { register, handleSubmit } = useForm();
  const [signup, setSignup] = useState({});
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const onSubmit = (data) =>
    setSignup({
      email: data.email,
      first_name: data.first_name,
      middle_name: data.middle_name || "",
      last_name: data.last_name,
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
          action="#"
          method="POST"
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
              className="input-basic"
              placeholder="Middle Name (opt)"
            />
            <input
              {...register("last_name")}
              id="last-name"
              name="last_name"
              required
              className="input-basic"
              placeholder="Last Name"
            />
            <input
              {...register("date_of_birth", {
                pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
              })}
              type="datetime"
              placeholder="Date of Birth"
              className="input-basic"
            />
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
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-secondary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-secondary"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Sign up
          </button>
          <div class="or-divider" style={{ marginTop: 15, marginBottom: 15 }}>
            <p
              class="font-bold text-gray-500 rounded-full bg-gray-50 flex items-center justify-center text-sm"
              style={{ height: 10, width: 50 }}
            >
              or
            </p>
          </div>
          {/* <GoogleButton /> */}
        </form>
      </div>
    </div>
  );
}

export default GoogleRegister;
