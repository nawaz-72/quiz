import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateBook = () => {
  const [res, setRes] = useState(false);
  const [check, setCheck] = useState(res);
  const [bData, setBdata] = useState({});
  const [reason, setReason] = useState("");

  async function addbookHandler(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/book/new",
        bData
      );
      console.log(data.book);
      console.log(data.sucess);
      setCheck(true);
      setRes(true);
      setTimeout(() => {
        setCheck(false);
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
        setReason(error.response.data.message);

        setCheck(true);
        setRes(false);
        setTimeout(() => {
          setCheck(false);
        }, 2000);
      }
    }
  }

  return (
    <Fragment>
      {check &&
        (res ? (
          <div
            class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div class="flex">
              <div class="py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <div>
                <p class="font-bold">Book Successfully Added</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div class="flex">
              <div class="py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <p class="font-bold">Book failed to added</p>
                <p class="font-normal ">{reason}</p>
              </div>
            </div>
          </div>
        ))}
      <div className="overflow-hidden relative flex  items-center min-h-screen bg-orange-50">
        <div className="absolute inset-x-auto w-full z-10">
          <div className="w-2/3 mx-auto shadow-md rounded-md p-4 border hover:border-red-400 hover:shadow-lg hover:shadow-gray-600 transition-colors duration-300  bg-white">
            <div className="flex justify-center mb-14 ">
              <h1 className="text-red-500 text-2xl">Create A Book</h1>
            </div>
            <div className="flex gap-8 flex-col md:flex-col center">
              <div className="relative flex-1">
                <input
                  id="title"
                  name="title"
                  onChange={(e) => {
                    setBdata({ ...bData, title: e.target.value });
                  }}
                  type="text"
                  className="peer h-10 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600 focus:border-2 p-3"
                  placeholder="mybook"
                />
                <label
                  for="title"
                  className="absolute left-2 px-1 -top-2.5 bg-white text-red-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Title :
                </label>
              </div>
              <div className="relative flex-1">
                <input
                  id="author"
                  name="author"
                  onChange={(e) => {
                    setBdata({ ...bData, author: e.target.value });
                  }}
                  type="text"
                  className="peer h-10 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600 focus:border-2 p-3"
                  placeholder="quelquechose"
                />
                <label
                  for="author"
                  className="absolute left-2 px-1 -top-2.5 bg-white text-red-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Author :
                </label>
              </div>
              <div className="relative flex-1">
                <input
                  id="page"
                  name="page"
                  type="number"
                  onChange={(e) => {
                    setBdata({ ...bData, numOfPage: e.target.value });
                  }}
                  className="peer h-10 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600 focus:border-2 p-3"
                  placeholder="quelquechose"
                />
                <label
                  for="page"
                  className="absolute left-2 px-1 -top-2.5 bg-white text-red-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  No. of Pages :
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Link to="/viewBook">
                {" "}
                <button className="text-gray-700 text-lg border rounded-lg px-3 py-2 duration-150 hover:bg-red-400 focus:bg-gray-200 focus:border-red-400">
                  View
                </button>
              </Link>
              <button
                className="text-gray-700 text-lg border rounded-lg px-3 py-2 duration-150 hover:bg-red-00 focus:bg-gray-200 focus:border-red-400"
                onClick={addbookHandler}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default CreateBook;
