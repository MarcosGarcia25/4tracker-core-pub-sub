import mongoose from 'mongoose';
mongoose.connect(
  `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}${process.env.MONGODB_ARGS}`,
);
const Schema = mongoose.Schema;

export const TrackerSchema = new Schema({
  id: String,
  companyId: String,
  vehicleId: String,
  trackerId: String,
  vehicle: Object,
  tracker: Object,
});

export const TrackerModel = mongoose.model('Tracker', TrackerSchema);