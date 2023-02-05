export interface SentCommand {
  trackerId: string;
  tracker: object;
  vehicleId: string;
  vehicle: object;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

export enum CommandType {
  BLOCK = 'BLOCK',
  UNLOCK = 'UNLOCK',
}

export const CommandEligibleSave = ['BLOCK', 'UNLOCK'];
