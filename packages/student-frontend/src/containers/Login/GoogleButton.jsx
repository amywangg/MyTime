import React from "react";
import GoogleLogin from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
};

const GoogleButton = () => {
  return (
    <GoogleLogin
      clientId="63266647869-885ju6hqa0l3e2seulj7rikkdl5hgult.apps.googleusercontent.com"
      buttonText="Login"
      render={(renderProps) => (
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondaryButton focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryButton"
          onClick={renderProps.onClick}
          style={{ marginTop: 0 }}
        >
          Log in with Google
        </button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

GoogleButton.propTypes = {};

export default GoogleButton;
