import React, { useState, useEffect, useMemo } from "react";
import Updatemodal from "./Updatemodal";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Modal, Ripple });

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(true);
  const [updatedPage, setUpdatedPage] = useState({})
  const [deleter, setDeleter] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedAuthor, setUpdatedAuthor] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data.book);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (id) => {
    // Find the selected book by id
    console.log("chal raha");
    const bookToUpdate = books.find((book) => book._id === id);
    //console.log(bookToUpdate)
    setSelectedBook(bookToUpdate);
    setUpdatedTitle(bookToUpdate.title);
    setUpdatedAuthor(bookToUpdate.author);
    setUpdatedPage(bookToUpdate.numOfPage)
    console.log(bookToUpdate);

    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/book/${id}`)
      .then((res) => {
        // Remove the book from books state
        const filteredBooks = books.filter((book) => book._id !== id);
        setBooks(filteredBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:3000/api/v1/book/${selectedBook._id}`, {
        title: updatedTitle,
        author: updatedAuthor,
        numOfPage: updatedPage
    }).then((res) => {
        console.log(res);
        // Update the book in the books state
        const updatedBooks = books.map(book => {
            if (book._id === selectedBook._id) {
            return {
                ...book,
                title: updatedTitle,
                author: updatedAuthor,
                numOfPage: updatedPage
            };
            }
            return book;
        });
        setBooks(updatedBooks);
    }).catch((err) => {
        console.log(err);
    }
    );
    
  };


  return (
    <div>
      {deleter ? (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b w-[100%] text-teal-900 px-4 py-3 shadow-md fixed"
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
              <p class="font-bold">Book Successfully Deleted</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

{/* <!--Verically centered modal--> */}
<div
  data-te-modal-init
  class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModalCenter"
  tabindex="-1"
  aria-labelledby="exampleModalCenterTitle"
  aria-modal="true"
  role="dialog">
  <div
    data-te-modal-dialog-ref
    class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
    <div
      class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div
        class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        {/* <!--Modal title--> */}
        <h5
          class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalScrollableLabel">
          {updatedTitle}
        </h5>
        {/* <!--Close button--> */}
        <button
          type="button"
          class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* <!--Modal body--> */}
      <div className="overflow-hidden relative flex  items-center min-h-screen bg-orange-50">
        <div className="absolute inset-x-auto w-full z-10">
          <div className="w-[90%] h-96 mx-auto shadow-md rounded-md p-4 border hover:border-red-400 hover:shadow-lg hover:shadow-gray-600 transition-colors duration-300  bg-white">
            <div className="flex justify-center mb-14 ">
              <h1 className="text-red-500 text-2xl">Update Book</h1>
            </div>
            <div className="flex gap-8 flex-col md:flex-col center">
              <div className="relative flex-1">
                <input
                  id="title"
                  name="title"
                  value={updatedTitle}
                  onChange={(e) => {
                    setUpdatedTitle(e.target.value)}
                  }
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
                  value={updatedAuthor}
                  onChange={(e) => {
                    setUpdatedAuthor(e.target.value)}
                  }
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
                  value={updatedPage}
                  onChange={(e) => {
                    setUpdatedPage(e.target.value)
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
          </div>
        </div>
      </div>

      {/* <!--Modal footer--> */}
      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <button
          type="button"
          class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-modal-dismiss
          data-te-ripple-init
          data-te-ripple-color="light">
          Close
        </button>
        <button
          type="button"
          //class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={ handleUpdateSubmit }>
          Update
        </button>
      </div>
    </div>
  </div>
</div>



      <section className="py-16  bg-orange-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 ">
          <div className="max-w-md">
            <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">
              Your Books
            </h1>
            <p className="text-gray-600 mt-2">
              It is what you read when you don't have to that determines what
              you will be when you can't help it.
            </p>
          </div>
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li className=" w-[100%] mx-auto shadow-md rounded-md p-4 border hover:border-red-400 hover:shadow-lg hover:shadow-gray-600 transition-colors duration-300  bg-white">
                <div className="flex items-start justify-between p-4 bg-white">
                  <div className="space-y-2">
                    <h4 className="text-gray-800  font-extrabold capitalize font-serif">
                      {book.title}
                    </h4>
                    <p className=" text-md text-red-600 capitalize">
                      {book.author}{" "}
                    </p>
                    <p className="text-gray-600 text-sm">{book.numOfPage}</p>
                    <p className="text-gray-700 text-xs">
                      <b>Date & Time: </b> {book.publishedAt}
                    </p>
                  </div>
                </div>
                <div className="py-5 px-4 border-t border-red-400 flex justify-between text-right  bg-white">
                  <button
                    className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-red-400"
                    onClick={() => {
                      setDeleter(true);
                      setTimeout(() => {
                        setDeleter(false);
                      }, 2000);
                      handleDelete(book._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                  data-te-toggle="modal"
                  data-te-target="#exampleModalCenter"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                    onClick={() => {
                      handleUpdate(book._id);
                    }}
                    className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-green-400"
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
};

export default ViewBook;
