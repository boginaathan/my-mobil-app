export interface Room {
  id: string;
  name: string;
  deviceCount: number;
  temperature: number;
  humidity: number;
  deviceIds: string[];
}

export interface ScheduleEntry {
  id: string;
  start: string;
  end: string;
}

export interface Device {
  id: string;
  name: string;
  room: string;
  roomId: string;
  icon: string;
  mode: 'auto' | 'manual';
  status: 'connected' | 'disconnected';
  on: boolean;
  brightness?: number;
  schedule?: ScheduleEntry[];
  usage: number[]; // 12 buckets, kWh
}

export interface ChartPoint {
  label: string;
  value: number;
}
