import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PositionPointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const PositionSchema = new Schema({
  trackerId: String,
  latitude: Number,
  longitude: Number,
  location: {
    type: PositionPointSchema,
    required: true,
    index: '2dsphere',
  },
  speed: Number,
  companyId: String,
  vehicleId: String,
  vehicle: Object,
  tracker: Object,
  trackerState: String,
  createdAt: Date,
  userId: String,
  journeyId: String,
  lastJourneyStatus: String,
  user: Object,
  journey: Object,
  isNewPosition: Boolean,
  timestamp: Date,
});

export const PositionModel = mongoose.model('Position', PositionSchema);
