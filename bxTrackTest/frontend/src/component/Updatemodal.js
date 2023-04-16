import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Updatemodal = () => {
  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedAuthor, setUpdatedAuthor] = useState("");

  const handleUpdate = (id) => {
    // Find the selected book by id
    const bookToUpdate = books.find((book) => book._id === id);
    setSelectedBook(bookToUpdate);
    setUpdatedTitle(bookToUpdate.title);
    setUpdatedAuthor(bookToUpdate.author);
    console.log(bookToUpdate);

    setOpenDialog(true);
  };

  const handleUpdateSubmit = () => {
    // Update the book in the database
    axios
      .patch(`http://localhost:5000/books/${selectedBook._id}`, {
        title: updatedTitle,
        author: updatedAuthor,
      })
      .then((res) => {
        console.log(res);
        // Update the book in the books state
        const updatedBooks = books.map((book) => {
          if (book._id === selectedBook._id) {
            return {
              ...book,
              title: updatedTitle,
              author: updatedAuthor,
            };
          }
          return book;
        });
        setBooks(updatedBooks);
        setOpenDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {true ? (
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
                    value={updatedTitle}
                    onChange={(e) => {
                      setUpdatedTitle(e.target.value);
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
                    value={updatedAuthor}
                    onChange={(e) => {
                      setUpdatedAuthor(e.target.value);
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
              </div>
              <div className="flex justify-between mt-6">
                <Link to="/viewBook">
                  {" "}
                  <button onClick={setOpenDialog(false)} className="text-gray-700 text-lg border rounded-lg px-3 py-2 duration-150 hover:bg-red-400 focus:bg-gray-200 focus:border-red-400">
                    cancel
                  </button>
                </Link>
                <button
                  className="text-gray-700 text-lg border rounded-lg px-3 py-2 duration-150 hover:bg-red-00 focus:bg-gray-200 focus:border-red-400"
                  onClick={handleUpdateSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Updatemodal;
