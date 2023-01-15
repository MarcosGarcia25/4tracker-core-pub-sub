export interface TrackerCommand {
  label: string;
  command: string;
  type: 'SMS' | 'GPRS';
}

export interface IDevice {
  id: string;
  model: string;
  manufacturer: string;
  commands: Array<TrackerCommand>;
}
