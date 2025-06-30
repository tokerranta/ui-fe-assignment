'use client';
import { Device } from '@/api/devices-schema';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent } from 'react';
import { Autocomplete } from '@/app/components';
import { DevicesResult } from './devices-result';
import Link from 'next/link';
import GridViewIcon from './grid-view.svg';
import ListViewIcon from './list-view.svg';

type ToolsProps = {
  devices: Array<Device>;
};

const Tools = ({ devices }: ToolsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deviceFilters = Array.from(
    new Set(
      devices
        .map((devices) => devices.line.name)
        .toSorted((a, b) => a.localeCompare(b))
    )
  );
  const [showFilter, setShowFilter] = React.useState(false);
  const hasNoFilters = searchParams.has('filter') === false;
  const filterParam = searchParams.get('filter');
  const mappedFilter = filterParam?.split(',').map((f) => f.trim()) ?? [];
  const displayMode = searchParams.get('display') ?? 'list';

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    const newFilters = e.target.checked
      ? [...mappedFilter, filterValue]
      : mappedFilter.filter((f) => f !== filterValue);

    if (newFilters.length === 0) {
      router.push(`/devices?display=${displayMode}`);
      return;
    }

    router.push(
      `/devices?filter=${newFilters.join(',')}&display=${displayMode}`
    );
  };

  const handleToggleFilter = () => setShowFilter((prev) => !prev);

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
      <div className="relative">
        <button
          onClick={handleToggleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filter
        </button>
        <div
          className={`absolute z-50 p-4 right-0 mt-2 w-48 bg-white rounded shadow-lg flex flex-col gap-4 ${
            showFilter ? '' : 'hidden'
          }`}
        >
          <h1 className="font-bold">Product Line</h1>
          <div className={`flex flex-col gap-2`}>
            {deviceFilters.map((filter) => (
              <div key={filter} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={handleFilterChange}
                  id={`line-${filter}`}
                  value={filter}
                  checked={mappedFilter.includes(filter)}
                  className="form-checkbox hover:cursor-pointer"
                />
                <label
                  htmlFor={`line-${filter}`}
                  className="text-sm hover:cursor-pointer"
                >
                  {filter}
                </label>
              </div>
            ))}
          </div>
          <Link
            href={`/devices?display=${displayMode}`}
            className={`${hasNoFilters ? 'text-red-300' : 'text-red-400'}`}
          >
            Reset
          </Link>
        </div>
      </div>
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
        <Tools devices={devices} />
      </div>
      <DevicesResult devices={filteredDevices} />
    </div>
  );
};
