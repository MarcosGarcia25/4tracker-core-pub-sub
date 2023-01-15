import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const SMSSentSchema = new Schema({
  trackerId: String,
  tracker: Object,
  vehicleId: String,
  vehicle: Object,
  phoneNumber: String,
  message: String,
  createdAt: Date,
});

export const SMSSentModel = mongoose.model('SMSSent', SMSSentSchema);
