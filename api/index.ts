import { Task } from '@/core/task';
import { Device, DeviceSchema, DevicesSchema } from './devices-schema';

export const getAllDevices = (): Task<{ devices: Array<Device> }> =>
  Task.from(() =>
    fetch('https://static.ui.com/fingerprint/ui/public.json')
  ).map(async (response) => {
    const awaited = await response;
    if (!awaited.ok) {
      throw new Error(`Failed to fetch devices: ${awaited.statusText}`);
    }
    const result = await awaited.json();
    return DevicesSchema.parse(result);
  });

export const getDeviceById = (deviceId: string) =>
  getAllDevices().map(async (response) => {
    const { devices } = await response;
    const device = devices.find((d) => d.id === deviceId);
    if (!device) {
      throw new Error(`Device with ID ${deviceId} not found`);
    }
    return DeviceSchema.parse(device);
  });

export const getNextDeviceId = (deviceId: string) =>
  getAllDevices().map(async (response) => {
    const { devices } = await response;
    const index = devices.findIndex((d) => d.id === deviceId);
    if (index === -1 || index === devices.length - 1) {
      return null;
    }
    return devices[index + 1].id;
  });

export const getPreviousDeviceId = (deviceId: string) =>
  getAllDevices().map(async (response) => {
    const { devices } = await response;
    const index = devices.findIndex((d) => d.id === deviceId);
    if (index <= 0) {
      return null;
    }
    return devices[index - 1].id;
  });
