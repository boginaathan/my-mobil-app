import { Injectable, signal } from '@angular/core';
import { Device, Room } from './models';

@Injectable({ providedIn: 'root' })
export class SmartHomeService {
  readonly userName = signal('John Doe');

  readonly rooms = signal<Room[]>([
    { id: 'living', name: 'Living Room', deviceCount: 4, temperature: 22, humidity: 43, deviceIds: ['main-light', 'reading-light', 'apple-tv', 'air-conditioner', 'hue-bridge'] },
    { id: 'sleeping', name: 'Sleeping', deviceCount: 2, temperature: 19, humidity: 54, deviceIds: [] },
    { id: 'office', name: 'Office', deviceCount: 2, temperature: 21, humidity: 39, deviceIds: ['hue-1', 'hue-2'] },
    { id: 'kitchen', name: 'Kitchen', deviceCount: 1, temperature: 20, humidity: 47, deviceIds: ['lg-fridge'] },
  ]);

  readonly devices = signal<Device[]>([
    {
      id: 'main-light', name: 'Main Light', room: 'Living Room', roomId: 'living', icon: 'bulb',
      mode: 'auto', status: 'connected', on: true, brightness: 20,
      schedule: [
        { id: 's1', start: '17:00', end: '22:00' },
        { id: 's2', start: '05:30', end: '07:00' },
      ],
      usage: [1, 7, 3, 3, 7, 6, 7, 3, 1, 8, 3, 0],
    },
    { id: 'reading-light', name: 'Reading Light', room: 'Living Room', roomId: 'living', icon: 'bulb', mode: 'auto', status: 'connected', on: false, brightness: 40, usage: [0,2,1,1,2,2,1,0,0,1,1,0] },
    { id: 'apple-tv', name: 'Apple TV', room: 'Living Room', roomId: 'living', icon: 'logo-apple', mode: 'manual', status: 'connected', on: false, usage: [0,0,1,2,1,0,0,0,1,2,1,0] },
    { id: 'air-conditioner', name: 'Air Conditioner', room: 'Living Room', roomId: 'living', icon: 'snow', mode: 'auto', status: 'disconnected', on: false, usage: [0,0,0,0,0,0,0,0,0,0,0,0] },

    { id: 'ring-video', name: 'Ring Video', room: 'Entrance', roomId: 'entrance', icon: 'videocam', mode: 'auto', status: 'connected', on: true, usage: [1,2,2,3,2,2,3,2,1,2,2,1] },
    { id: 'lg-fridge', name: 'LG Side-by-Side', room: 'Kitchen', roomId: 'kitchen', icon: 'restaurant', mode: 'auto', status: 'connected', on: true, usage: [3,3,3,4,3,3,4,3,3,4,3,3] },
    { id: 'ps5', name: 'PlayStation 5', room: 'Living', roomId: 'living', icon: 'game-controller', mode: 'manual', status: 'connected', on: false, usage: [0,0,0,1,3,4,3,1,0,0,0,0] },
    { id: 'hue-1', name: 'Philips Hue', room: 'Office', roomId: 'office', icon: 'bulb', mode: 'auto', status: 'connected', on: true, brightness: 60, usage: [1,1,2,2,3,3,2,2,1,1,1,0] },
    { id: 'hue-2', name: 'Philips Hue', room: 'Office', roomId: 'office', icon: 'bulb', mode: 'auto', status: 'connected', on: true, brightness: 60, usage: [1,1,2,2,3,3,2,2,1,1,1,0] },
    { id: 'hue-bridge', name: 'Philips Hue Bridge', room: 'Living', roomId: 'living', icon: 'wifi', mode: 'auto', status: 'connected', on: true, usage: [1,1,1,1,1,1,1,1,1,1,1,1] },
  ]);

  // 0h - 6h buckets used on Dashboard / Statistics
  readonly recentUsage = [40, 55, 35, 25, 45, 65, 70];
  readonly loadPeak = 45;

  readonly expensesDay = [1, 3.2, 4.5, 2.2, 0.6, 1.4, 2.0, 1.6, 1.0, 3.6, 5.2, 5.8, 4.6];
  readonly electricityDay = [0.4, 0.6, 0.5, 1.8, 1.2, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3];

  readonly forecastCost = 21.02;
  readonly currentCost = 17.21;

  readonly sharesWater = 78;
  readonly sharesElectricity = 22;

  readonly todayConsumedPercent = 71;
  readonly todayConsumedValue = 71;
  readonly todayTotalValue = 100;

  readonly waterQualityScore = 94;

  getRoom(id: string): Room | undefined {
    return this.rooms().find((r) => r.id === id);
  }

  getDevicesForRoom(roomId: string): Device[] {
    return this.devices().filter((d) => d.roomId === roomId);
  }

  getDevice(id: string): Device | undefined {
    return this.devices().find((d) => d.id === id);
  }

  toggleDevice(id: string) {
    this.devices.update((list) => list.map((d) => (d.id === id ? { ...d, on: !d.on } : d)));
  }

  setBrightness(id: string, value: number) {
    this.devices.update((list) => list.map((d) => (d.id === id ? { ...d, brightness: value } : d)));
  }
}
