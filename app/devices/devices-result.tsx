import { Device } from '@/db/devices-schema';

type DevicesResultProps = {
  devices: Array<Device>;
  variant?: 'grid' | 'list';
};

export const DevicesResult = ({
  devices,
  variant = 'list',
}: DevicesResultProps) => {
  const getImateUrl = (
    device: Device
  ) => `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimage
s%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${25}&q=75`;

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Product Line</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="even:bg-gray-100 odd:bg-white py-12">
              <td>
                <img src={getImateUrl(device)} alt={device.product.name} />
              </td>
              <td>{device.line.name}</td>
              <td>{device.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
