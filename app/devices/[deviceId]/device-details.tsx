import { Device } from '@/db/devices-schema';

type DeviceDetailsProps = {
  device: Device;
};

export const DeviceDetails = ({ device }: DeviceDetailsProps) => {
  return <h1 className="text-3xl text-center">{device.product.name}</h1>;
};
