import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?authSource=admin&tls=true`,
);

export const PositionSchema = new Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  speed: Number,
});

export const PositionModel = mongoose.model('Position', PositionSchema);
