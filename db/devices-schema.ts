import { z } from 'zod';
export const DeviceSchema = z.object({
  id: z.string(),
  images: z.object({
    default: z.string(),
  }),
  line: z.object({
    id: z.string(),
    name: z.string(),
  }),
  product: z.object({
    name: z.string(),
  }),
});

export type Device = z.infer<typeof DeviceSchema>;

export const DevicesSchema = z.object({
  devices: z.array(DeviceSchema),
});

export type Devices = z.infer<typeof DevicesSchema>;
