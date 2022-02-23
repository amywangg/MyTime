import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const [error, setError] = useState(false);

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    const navigate = useNavigate();
    navigate("/login/google");
  };

  const responseGoogleFail = (response) => {
    setError("Google Login Unsuccessful");
  };

  return (
    <div>
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
        onFailure={responseGoogleFail}
        cookiePolicy={"single_host_origin"}
      />
      {error && <div>Google Login Unsuccessful</div>}
    </div>
  );
};

GoogleButton.propTypes = {};

export default GoogleButton;
