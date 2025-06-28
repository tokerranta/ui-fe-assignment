import { ErrorMessage } from '@/app/components/error-message';
import { getDeviceById, getNextDeviceId, getPreviousDeviceId } from '@/api';
import { DeviceDetails } from './device-details';

export default async function DeviceDetailsPage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;
  return getDeviceById(deviceId)
    .map(async (device) => {
      const nextDeviceId = await getNextDeviceId(deviceId).match({
        onOk: (id) => id,
        onError: () => null,
      });
      const previousDeviceId = await getPreviousDeviceId(deviceId).match({
        onOk: (id) => id,
        onError: () => null,
      });

      return { device: await device, nextDeviceId, previousDeviceId };
    })
    .match({
      onOk: ({ device, nextDeviceId, previousDeviceId }) => (
        <DeviceDetails
          device={device}
          previousDeviceId={previousDeviceId}
          nextDeviceId={nextDeviceId}
        />
      ),
      onError: (error) => <ErrorMessage error={error} />,
    });
}
