import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['available', 'issued'], default: 'available' },
});

const Book = model('Book', bookSchema);

export default Book;
