import { Devices } from './devices';
import { ErrorMessage } from '@/app/components';
import { Suspense } from 'react';
import { getAllDevices } from '@/api';

export default function DevicesPage() {
  return getAllDevices().match({
    onOk: ({ devices }) => (
      <Suspense>
        <Devices devices={devices} />
      </Suspense>
    ),
    onError: (error) => <ErrorMessage error={error} />,
  });
}
