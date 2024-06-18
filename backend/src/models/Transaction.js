import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  actualReturnDate: { type: Date },
  status: { type: String, enum: ['issued', 'returned'], default: 'issued' },
  fine: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
