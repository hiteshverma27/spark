import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

function Onboarding() {
  const { userDispatch, userDetails } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      userDispatch({ type: "SET_LATITUDE", payload: position.coords.latitude });
      userDispatch({
        type: "SET_LONGITUDE",
        payload: position.coords.longitude,
      });
    });
  }, [userDispatch, userDetails.latitude, userDetails.longitude]);
  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-6xl ">Hello, lets get you started</h1>
      <form className="justify-center">
        <input
          onChange={(e) =>
            userDispatch({ type: "SET_NAME", payload: e.target.value })
          }
          value={userDetails.userName}
          placeholder="Enter your name"
          className="border-b-2 focus:outline-none text-2xl bg-transparent w-64 mt-4 text-center md:w-2/6 md:p-4 md:text-4xl"
        />
        <br />
        <button
          type="submit"
          className="m-4"
          onClick={(e) => {
            e.preventDefault();
            console.log(userDetails.userName);
            userDispatch({ type: "SET_NAME", payload: userDetails.userName });

            navigate("/home");
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export { Onboarding };
