'use client';
import { Device } from '@/db/devices-schema';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Autocomplete } from '@/app/components';
import { DevicesResult } from './devices-result';
import Link from 'next/link';
import GridViewIcon from './grid-view.svg';
import ListViewIcon from './list-view.svg';

const Tools = () => {
  const searchParams = useSearchParams();
  const displayMode = searchParams.get('display') ?? 'list';
  return (
    <div className="flex items-center gap-2 px-4">
      <Link href={`/devices?display=list`}>
        <ListViewIcon
          className={`hover:stroke-blue-300 ${
            displayMode === 'list' ? 'stroke-blue-300' : undefined
          }`}
        />
      </Link>
      <Link href={`/devices?display=grid`}>
        <GridViewIcon
          className={`hover:stroke-blue-300 ${
            displayMode === 'grid' ? 'stroke-blue-300' : undefined
          }`}
        />
      </Link>
    </div>
  );
};

type DevicesProps = {
  devices: Array<Device>;
};

export const Devices = ({ devices }: DevicesProps) => {
  const [filteredDevices, setFilteredDevices] = React.useState(devices);
  const router = useRouter();
  const handleItemSelected = (deviceId: string) => {
    router.push(`/devices/${deviceId}`);
  };

  const handleClear = () => {
    setFilteredDevices(devices);
  };

  const handleSearch = (productName: string) => {
    setFilteredDevices(
      devices.filter((device) =>
        device.product.name.toLowerCase().includes(productName.toLowerCase())
      )
    );
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between px-4">
        <Autocomplete
          onItemSelected={handleItemSelected}
          onSearch={handleSearch}
          onClearSearch={handleClear}
          options={devices.map((d) => ({
            label: d.product.name,
            value: d.id,
          }))}
        />
        <Tools />
      </div>
      <DevicesResult devices={filteredDevices} />
    </div>
  );
};
