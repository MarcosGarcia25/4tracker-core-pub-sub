import mongoose from 'mongoose';
import { VehicleTrackerHistoryStatus } from '../handler/tracker-company/interfaces/Tracker.interface';
const Schema = mongoose.Schema;

export const TrackerSchema = new Schema({
  id: String,
  companyId: String,
  vehicleId: String,
  trackerId: String,
  vehicle: Object,
  tracker: Object,
  status: {
    type: String,
    enum: VehicleTrackerHistoryStatus,
    default: VehicleTrackerHistoryStatus.ACTIVE,
  },
  state: String,
});

export const TrackerModel = mongoose.model('Tracker', TrackerSchema);
