const Book = require("../model/bookModel");
const catchAsyncFunc = require('../middleware/catchAsyncFunc');
const ErrorHandler = require("../utils/errorhandling");

//create book
exports.createBook = catchAsyncFunc(async (req, res, next) => {
    const book = await Book.create(req.body);
  
    res.status(201).json({
      sucess: true,
      book,
    });
  });

//get all Books
exports.getAllBook = catchAsyncFunc(async (req, res, next) => {
    const book = await Book.find();
  
    res.status(201).json({
      sucess: true,
      book,
    });
  });

//update Book data

exports.updateBook = catchAsyncFunc(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    if (!book) {
      return next(new ErrorHandler("Book not found", 404))
    }
    res.status(201).json({
      sucess: true,
      book,
    });
  });

//book deleted
exports.deleteBook = catchAsyncFunc(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return next(new ErrorHandler("Book not found", 404))
    }

    res.status(201).json({
      sucess: true,
      message: "Book Deleted Successfully",
    });
  })