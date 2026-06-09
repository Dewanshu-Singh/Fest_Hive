import mongoose, { Schema, Document } from 'mongoose';

export interface IContactQuery extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
}

const ContactQuerySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IContactQuery>('ContactQuery', ContactQuerySchema);
