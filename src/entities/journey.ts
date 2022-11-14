import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const JourneySchema = new Schema({
  id: String,
  userId: String,
  journeyId: String,
  vehicleId: String,
  companyId: String,
  journey: Object,
  user: Object,
  vehicle: Object,
  company: Object,
});

export const JourneyModel = mongoose.model('Journey', JourneySchema);
