import { ErrorMessage } from '@/app/components/error-message';
import { getDeviceById, getNextDeviceId, getPreviousDeviceId } from '@/db/db';
import { DeviceDetails } from './device-details';

export default async function DeviceDetailsPage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;
  return getDeviceById(deviceId)
    .map((device) => {
      const nextDeviceId = getNextDeviceId(deviceId).execute({
        onOk: (id) => id,
        onError: () => null,
      });
      const previousDeviceId = getPreviousDeviceId(deviceId).execute({
        onOk: (id) => id,
        onError: () => null,
      });

      return { device, nextDeviceId, previousDeviceId };
    })
    .execute({
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
