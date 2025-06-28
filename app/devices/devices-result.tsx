import { Device } from '@/api/devices-schema';
import { useSearchParams } from 'next/navigation';

type DevicesResultProps = {
  devices: Array<Device>;
};

const getImageUrl = (
  device: Device
) => `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimage
s%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${25}&q=75`;

const GridView = ({ devices }: DevicesResultProps) => {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6`}
    >
      {devices.map((device) => (
        <div key={device.id} className="border p-4">
          <img
            src={getImageUrl(device)}
            alt={device.product.name}
            width={50}
            height={50}
          />
          <h3>{device.line.name}</h3>
          <p>{device.product.name}</p>
        </div>
      ))}
    </div>
  );
};

const TableView = ({ devices }: DevicesResultProps) => {
  return (
    <div
      role="table"
      className="w-full relative max-h-[calc(100vh-200px)] overflow-y-auto"
    >
      <div role="rowgroup" className="sticky top-0 bg-white z-10 py-2">
        <div role="row" className="flex">
          <div role="columnheader" className="w-[50px]"></div>
          <div
            role="columnheader"
            className="text-left w-[calc(50vw-50px)] font-bold"
          >
            Product Line
          </div>
          <div
            role="columnheader"
            className="text-left w-[calc(50vw-50px)] font-bold"
          >
            Name
          </div>
        </div>
      </div>
      <div role="rowgroup">
        {devices.map((device) => (
          <div
            key={device.id}
            role="row"
            className="border-b border-b-gray-100 py-2 flex"
          >
            <div role="cell" className="w-[50px]">
              <img
                src={getImageUrl(device)}
                alt={device.product.name}
                width={25}
                height={75}
              />
            </div>
            <div role="cell" className="w-[calc(50vw-50px)]">
              {device.line.name}
            </div>
            <div role="cell" className="w-[calc(50vw-50px)]">
              {device.product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DevicesResult = ({ devices }: DevicesResultProps) => {
  const searchParams = useSearchParams();
  const displayMode = searchParams.get('display') ?? 'list';

  return (
    <div className="p-4">
      {displayMode === 'grid' ? (
        <GridView devices={devices} />
      ) : (
        <TableView devices={devices} />
      )}
    </div>
  );
};
