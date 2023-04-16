const mongoose =  require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter Book Title"]
        },
    author: {
            type: String,
            required: [true, "Please enter Authon name"]
        },
    numOfPage: {
            type: Number,
            required: [true, "You cant add empty Book"]
        },
    publishedAt: {
            type: Date,
            default: Date.now()
        },
    
});

module.exports = mongoose.model('Book', bookSchema);

