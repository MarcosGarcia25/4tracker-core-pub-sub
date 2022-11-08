import { kStringMaxLength } from 'buffer';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.connect(
  `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}${process.env.MONGODB_ARGS}`,
);

export const PositionSchema = new Schema({
  trackerId: String,
  latitude: Number,
  longitude: Number,
  speed: Number,
  companyId: String,
  vehicleId: String,
  vehicle: Object,
  tracker: Object,
  createdAt: Date,
  userId: String,
  journeyId: String,
  user: Object,
  journey: Object,
});

export const PositionModel = mongoose.model('Position', PositionSchema);
