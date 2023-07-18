/**
 * Save book per user
 */
import mongoose from 'mongoose';

// Books Config 
//Schema base on response of https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json
const BooksSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    contributor: { type: String, required: true },
    author: { type: String, required: true },
    contributor_note: { type: String },
    price: { type: String, required: true },
    age_group: { type: String, required: true },
    publisher: { type: String, required: true },
    isbns: { type: [Object], required: true },
    ranks_history: { type: Array, required: true },
    reviews: { type: [Object], required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
});

export const BooksModel = mongoose.model('Books', BooksSchema);

// Books Actions
export const getBooks = () => BooksModel.find();
export const getBooksByEmail = (email: string) => BooksModel.findOne({ email });
export const getBooksById = (id: string) => BooksModel.findById(id);
export const createBooks = (values: Record<string, any>) => new BooksModel(values).save().then((Books) => Books.toObject());
export const deleteBooksById = (id: string) => BooksModel.findOneAndDelete({ _id: id });
export const updateBooksById = (id: string, values: Record<string, any>) => BooksModel.findByIdAndUpdate(id, values);