import mongoose from 'mongoose';
import { VehicleTrackerHistoryStatus } from '../handler/tracker-company/enum/VehicleTrackerHistoryStatus.enum';
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
});

export const TrackerModel = mongoose.model('Tracker', TrackerSchema);
