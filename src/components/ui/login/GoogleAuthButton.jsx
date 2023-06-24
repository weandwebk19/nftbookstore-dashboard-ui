// External imports
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { oAuthLogin } from "@/redux/actions/auth";

import config from "../../../config";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

const GoogleAuthButton = () => {
  const googleButton = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id = config.GOOGLE_CLIENT_ID;

    function handleCredentialResponse(response) {
      const userObj = jwt_decode(response.credential);
      (async () => {
        const res = await dispatch(oAuthLogin(userObj));
        if (res.isRegisterd === false) {
          navigate("/register");
        }
        if (res.success === true) {
          navigate(-2);
        }
      })();
    }

    loadScript(src)
      .then(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
          width: 400
        });
        google.accounts.id.prompt(); // also display the One Tap dialog
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, [dispatch, navigate]);

  return <div ref={googleButton} />;
};

export default GoogleAuthButton;
