import { getAllDevices } from '@/db/db';
import { Devices } from './devices';
import { ErrorMessage } from '@/app/components';
import { Suspense } from 'react';

export default function DevicesPage() {
  return getAllDevices().execute({
    onOk: (devices) => (
      <Suspense>
        <Devices devices={devices} />
      </Suspense>
    ),
    onError: (error) => <ErrorMessage error={error} />,
  });
}
