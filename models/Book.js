const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    finishedDate: {
        type: Date,
        required: false,
    },
    currentPage: {
        type: Number,
        required: false,
    },
    finished: {
        type: Boolean,
        required: true,
    },
    notes: [{
        page: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = Book = mongoose.model('book', BookSchema)