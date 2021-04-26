const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
    bookId: {
        type: String,
        required: true,
    },
    totalPages: {
        type: Number,
        required: false,
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
    readingStatus: {
        type: String,
        required: true,
        default: 'reading',
    },
    uncompletedReason: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    review: {
        type: String,
        required: false,
    },
    categories: {
        type: Array,
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