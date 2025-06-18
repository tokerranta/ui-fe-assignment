import { getAllDevices } from '@/db/db';
import { Devices } from './devices';
import { ErrorMessage } from '@/app/components';

export default function DevicesPage() {
  return getAllDevices().execute({
    onOk: (devices) => <Devices devices={devices} />,
    onError: (error) => <ErrorMessage error={error} />,
  });
}
