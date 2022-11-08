import mongoose from 'mongoose';
mongoose.connect(
  `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}${process.env.MONGODB_ARGS}`,
);
const Schema = mongoose.Schema;

export const JourneySchema = new Schema({
  id: String,
  userId: String,
  journey: Object,
  user: Object,
  vehicle: Object,
});

export const JourneyModel = mongoose.model('Journey', JourneySchema);