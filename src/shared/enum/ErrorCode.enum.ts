export enum ErrorCode {
  REGISTER_USER_FAILED = 'register.user.failed',
  AUTHENTICATION_USER_FAILED = 'authentication.user.failed',
  AUTHENTICATION_UNAUTHORIZED = 'authentication.unauthorized',
  AUTHENTICATION_FORBIDDEN = 'authentication.forbidden',

  ROLE_GET_FAILED = 'role.get.failed',
  ROLE_UPDATE_FAILED = 'role.update.failed',
  ROLE_DELETE_FAILED = 'role.delete.failed',

  USER_GET_FAILED = 'user.get.failed',
  USER_UPDATE_FAILED = 'user.update.failed',
  USER_DELETE_FAILED = 'user.delete.failed',

  CITY_GET_FAILED = 'city.get.failed',
  CITY_UPDATE_FAILED = 'city.update.failed',
  CITY_DELETE_FAILED = 'city.delete.failed',

  JOURNEY_GET_FAILED = 'journey.get.failed',
  JOURNEY_UPDATE_FAILED = 'journey.update.failed',
  JOURNEY_DELETE_FAILED = 'journey.delete.failed',

  COMPANY_GET_FAILED = 'company.get.failed',
  COMPANY_CREATE_FAILED = 'company.create.failed',
  COMPANY_UPDATE_FAILED = 'company.update.failed',
  COMPANY_DELETE_FAILED = 'company.delete.failed',

  STATE_GET_FAILED = 'state.get.failed',
  STATE_UPDATE_FAILED = 'state.update.failed',
  STATE_DELETE_FAILED = 'state.delete.failed',

  TRACKER_GET_FAILED = 'tracker.get.failed',
  TRACKER_UPDATE_FAILED = 'tracker.update.failed',
  TRACKER_DELETE_FAILED = 'tracker.delete.failed',

  VEHICLE_GET_FAILED = 'vehicle.get.failed',
  VEHICLE_UPDATE_FAILED = 'vehicle.update.failed',
  VEHICLE_DELETE_FAILED = 'vehicle.delete.failed',

  VEHICLE_TRACKER_HISTORY_GET_FAILED = 'vehicleTrackerHistory.get.failed',
  VEHICLE_TRACKER_HISTORY_UPDATE_FAILED = 'vehicleTrackerHistory.update.failed',
  VEHICLE_TRACKER_HISTORY_DELETE_FAILED = 'vehicleTrackerHistory.delete.failed',
  VEHICLE_TRACKER_HISTORY_ASSOCIATE_FAILED = 'vehicleTrackerHistory.associate.failed',

  REFRESH_TOKEN_INVALID = 'refresh.token.invalid',
  TOKEN_INVALID = 'token.invalid',

  ERROR_FIELD = 'error.field',
}
