import { Device } from '@/api/devices-schema';

type ProductImageProps = {
  device: Device;
};

export const ProductImage = ({ device }: ProductImageProps) => {
  const imageUrl = `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimage
s%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${200}&q=75`;
  return (
    <img src={imageUrl} alt={device.product.name} width={200} height={100} />
  );
};
