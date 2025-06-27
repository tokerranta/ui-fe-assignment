import { ProductImage } from '@/app/components/product-image';
import { Device } from '@/db/devices-schema';
import Link from 'next/link';
import BackIcon from './back.svg';
import ForwardIcon from './forward.svg';
import { PropsWithChildren } from 'react';

type DeviceDetailsProps = {
  device: Device;
  nextDeviceId: string | null;
  previousDeviceId: string | null;
};

const DeviceDetailsRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-400">{value}</span>
  </div>
);

const DeviceDetailsDescription = ({ device }: { device: Device }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-2xl font-bold">{device.product.name}</h1>
        <span className="text-gray-400">{device.line.name}</span>
      </div>
      <DeviceDetailsRow label="Product Line" value={device.line.name} />
      <DeviceDetailsRow label="ID" value={device.line.id} />
      <DeviceDetailsRow label="Name" value={device.product.name} />
      <DeviceDetailsRow
        label="Short Name"
        value={device.shortnames?.at(0) ?? 'N/A'}
      />
      <DeviceDetailsRow
        label="Max. Power"
        value={
          device.unifi?.network?.radios?.na?.maxPower
            ?.toString()
            .concat(' W') ?? 'N/A'
        }
      />
      <DeviceDetailsRow
        label="Speed"
        value={
          device.unifi?.network?.radios?.na?.maxSpeedMegabitsPerSecond
            ?.toString()
            .concat(' Mbsp') ?? 'N/A'
        }
      />
      <DeviceDetailsRow
        label="Number of Ports"
        value={device.unifi?.network?.numberOfPorts?.toString() ?? 'N/A'}
      />
    </div>
  );
};

const LinkButton = ({
  children,
  href,
}: PropsWithChildren<{ href: string }>) => (
  <Link
    href={href}
    className="px-4 py-2 shadow-xl flex gap-2 items-center hover:bg-gray-100 rounded"
  >
    {children}
  </Link>
);

const DeviceDetailsNavigation = ({
  nextDeviceId,
  previousDeviceId,
}: {
  nextDeviceId: string | null;
  previousDeviceId: string | null;
}) => (
  <nav className="flex justify-between">
    <LinkButton href="/devices">
      <BackIcon />
      <span>Back</span>
    </LinkButton>
    <div className="flex gap-2">
      <LinkButton href={previousDeviceId ?? ''}>
        <BackIcon />
      </LinkButton>
      <LinkButton href={nextDeviceId ?? ''}>
        <ForwardIcon />
      </LinkButton>
    </div>
  </nav>
);

export const DeviceDetails = ({
  device,
  nextDeviceId,
  previousDeviceId,
}: DeviceDetailsProps) => {
  return (
    <div className="flex flex-col gap-8 px-4 py-4">
      <DeviceDetailsNavigation
        nextDeviceId={nextDeviceId}
        previousDeviceId={previousDeviceId}
      />
      <div className="m-auto w-[90vw] md:w-[60vw]">
        <div className="flex gap-8">
          <div className="bg-gray-50 p-4 w-1/2 justify-center flex items-center">
            <ProductImage device={device} />
          </div>
          <DeviceDetailsDescription device={device} />
        </div>
      </div>
    </div>
  );
};
