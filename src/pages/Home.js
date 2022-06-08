import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useUser } from "../context/userContext";
import axios from "axios";
import { formatAMPM } from "../utils";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";

function Home() {
  const { userDetails, userDispatch } = useUser();
  const [time, setTime] = useState("");
  const [focus, setFocus] = useState("");
  const [quote, setQuote] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("lat")
      ? userDispatch({
          type: "SET_LATITUDE",
          payload: localStorage.getItem("lat"),
        })
      : navigator.geolocation.getCurrentPosition((position) => {
          userDispatch({
            type: "SET_LATITUDE",
            payload: position.coords.latitude,
          });
          userDispatch({
            type: "SET_LONGITUDE",
            payload: position.coords.longitude,
          });
        });

       userDispatch({
          type: "SET_NAME",
          payload: localStorage.getItem("name"),
        })

    localStorage.getItem("name")
      ? (async () => {
          const apiKey = "243fcd6cae5e64bc9ca3df1973074968";
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userDetails.latitude}&lon=${userDetails.longitude}&appid=${apiKey}`;
          const response = await axios.get(url);
          const tempreature = response.data.main.temp - 273;
          userDispatch({
            type: "SET_CITY",
            payload: response.data.name,
          });
          userDispatch({
            type: "SET_TEMP",
            payload: tempreature ? tempreature.toFixed(1) : 25,
          });
          localStorage.getItem("focus") &&
            setFocus(localStorage.getItem("focus"));
        })()
      : navigate("/");
  }, [
    userDetails.latitude,
    userDetails.longitude,
    navigate,
    userDetails.userName,
    userDispatch,
  ]);

  useEffect(() => {
    async function fetchQuotes() {
      const a = Math.random() * (100 - 0) + 0;
      const res = await axios.get("https://type.fit/api/quotes");
      setQuote(res.data[a.toFixed()]);
    }
    fetchQuotes();
  }, []);

  setInterval(() => setTime(formatAMPM(new Date())), 1000);

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const todoSubmitHandler = (e, input) => {
    e.preventDefault();
    setTodos((prev) => [...prev, { _id: uuid(), todo: input }]);
    setTodoInput("");
  };

  return (
    <div className="App  justify-center items-center h-screen w-screen">
      {userDetails.userName && (
        <>
          <nav className="flex w-screen justify-between">
            <div className="justify-end p-2">
              <h1 className="text-xl">{`${userDetails.temp} °C`}</h1>
              <h1 className="text-1xl">{userDetails.userCity}</h1>
            </div>
            <button
              className="m-2 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
              onClick={() => openModal()}
            >
              Todo
            </button>
          </nav>
          <Modal ref={modalRef}>
            <div className="flex w-full justify-between items-center">
              <h3>Todos</h3>
              <button className="m-2" onClick={() => modalRef.current.close()}>
                X
              </button>
            </div>
            <hr />
            {todos.map(({ todo, _id }) => {
              return (
                <label key={_id} className={`flex items-center m-2}`}>
                  {todo}
                </label>
              );
            })}
            <form>
              <label>
                <input
                  type={"text"}
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  className="border-b-2 focus:outline-none  bg-transparent w-64 mt-4 text-center md:p-2 border-2 border-cyan-600 rounded"
                />
              </label>
              <button
                type="submit"
                disabled={!Boolean(todoInput)}
                onClick={(e) => todoSubmitHandler(e, todoInput)}
              >
                Add Todo{" "}
              </button>
            </form>
          </Modal>
          <main className="justify-center h-3/4 grid place-items-center">
            <h1 className="text-8xl">{time}</h1>
            <h1 className="text-5xl">{`${
              time.slice(6, 9) === "AM"
                ? "Good Night"
                : Number(time.slice(0, 2)) > 6
                ? "Good Evening"
                : "Good After Noon"
            } ${userDetails.userName}`}</h1>
            <h1 className="text-5xl">
              Your focus for today{" "}
              <input
                type={"text"}
                onChange={(e) => {
                  setFocus(e.target.value);
                  localStorage.setItem("focus", e.target.value);
                }}
                value={focus}
                className="border-b-2 focus:outline-none text-2xl mx-auto bg-transparent mt-4 text-center md:w-2/6 md:p-2 md:text-4xl w-fit"
              />
            </h1>
          </main>
          <div className="flex justify-center items-center ">
            <h1 className="text-3xl">
              "{quote.text ? quote.text : "Keep going!"}"
            </h1>
            <h1 className="text-xl">
              {quote.author ? `-${quote.author}` : "-Hitesh"}
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

export { Home };
