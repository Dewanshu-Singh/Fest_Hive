import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  location: string;
  description: string;
  category: string;
  bannerImage: string;
  galleryImages: string[];
  registrationLink?: string;
  isPublished: boolean;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  bannerImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  registrationLink: { type: String },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);
