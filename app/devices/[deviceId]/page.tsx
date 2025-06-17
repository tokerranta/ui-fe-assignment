import { ErrorMessage } from '@/app/components/error-message';
import { getDeviceById } from '@/db/db';
import { DeviceDetails } from './device-details';

export default async function DeviceDetailsPage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;
  return getDeviceById(deviceId).execute({
    onOk: (device) => <DeviceDetails device={device} />,
    onError: (error) => <ErrorMessage error={error} />,
  });
}
