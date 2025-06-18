'use client';
import { Device } from '@/db/devices-schema';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Autocomplete } from '@/app/components';
import { DevicesResult } from './devices-result';

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
    <div className="grid">
      <Autocomplete
        onItemSelected={handleItemSelected}
        onSearch={handleSearch}
        onClearSearch={handleClear}
        options={devices.map((d) => ({
          label: d.product.name,
          value: d.id,
        }))}
      />
      <DevicesResult devices={filteredDevices} />
    </div>
  );
};
