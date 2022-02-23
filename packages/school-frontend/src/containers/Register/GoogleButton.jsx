import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import ReactTooltip from "react-tooltip";

const GoogleButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    setError(false);
    navigate("/google-register");
  };

  const onFailure = () => {
    setError(true);
  };

  return (
    <div>
      <GoogleLogin
        clientId="63266647869-885ju6hqa0l3e2seulj7rikkdl5hgult.apps.googleusercontent.com"
        buttonText="Login"
        render={(renderProps) => (
          <button
            data-tip
            data-for="error"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondaryButton focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryButton"
            onClick={renderProps.onClick}
            style={{ marginTop: 0 }}
          >
            Sign up with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
      {error && (
        <ReactTooltip id="error" place="bottom" type="dark" effect="solid">
          <span> Login via Google Unsuccessful</span>
        </ReactTooltip>
      )}
    </div>
  );
};

GoogleButton.propTypes = {};

export default GoogleButton;
