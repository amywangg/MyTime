import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import GoogleButton from "./GoogleButton";
import { AuthContext } from "../../context/AuthContext";
import school from "../../assets/school.jpeg";

function Login() {
  const { login, error } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) =>
    login({
      email: data.email,
      password: data.password,
    });

  return (
    <div
      className="h-[100%] flex items-center justify-center pb-32 px-4 sm:px-6 lg:px-8 bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(235,248,233, 0.9), rgba(0, 0, 0, 0.4)), url(${school})`,
      }}
    >
      {/* <img className="absolute opacity-20 left-0 top-0 w-full h-full" src={school}/> */}
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* TODO: LOGO HERE */}
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary hover:text-secondary"
            >
              Sign up
            </a>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 gap-3"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              {...register("email")}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Password"
            />
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
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
