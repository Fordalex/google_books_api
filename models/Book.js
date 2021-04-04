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
    totalPages: {
        type: Number,
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
    rating: {
        type: Number,
        required: false,
    },
    notes: [{
        title: {
            type: String,
            required: true,
            default: "Title",
        },
        noteInfo: {
            type: String,
            required: true,
        },
        noteType: {
            type: String,
            required: true,
        },
        pageNumber: {
            type: Number,
            required: false,
        },
        note: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = Book = mongoose.model('book', BookSchema)