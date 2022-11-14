import mongoose from 'mongoose';
mongoose.connect(
  `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}${process.env.MONGODB_ARGS}`,
);
