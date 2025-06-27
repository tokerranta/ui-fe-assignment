import { DevicesSchema } from '@/db/devices-schema';
import { readFile } from '@/core/io';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllDevices = () =>
  readFile(join(__dirname, 'devices.json'))
    .map(JSON.parse)
    .map(DevicesSchema.parse)
    .map((result) => result.devices);

export const getDeviceById = (id: string) =>
  getAllDevices().map((devices) => {
    const found = devices.find((device) => device.id === id);
    if (!found) {
      throw new Error(`Device with id ${id} not found`);
    }
    return found;
  });

export const getNextDeviceId = (id: string) =>
  getAllDevices().map((devices) => {
    const index = devices.findIndex((device) => device.id === id);
    if (index === -1 || index === devices.length - 1) {
      return null;
    }
    return devices[index + 1].id;
  });

export const getPreviousDeviceId = (id: string) =>
  getAllDevices().map((devices) => {
    const index = devices.findIndex((device) => device.id === id);
    if (index === -1 || index === 0) {
      return null;
    }
    return devices[index - 1].id;
  });
