import { randomUUID } from 'crypto';
import { BrandEntity } from 'src/brands/entities/brand.entity';

export const BRANDS_SEED: BrandEntity[] = [
  { id: randomUUID(), name: 'Toyota', createdAt: new Date().getTime() },
  { id: randomUUID(), name: 'Peugeot', createdAt: new Date().getTime() },
  { id: randomUUID(), name: 'Mazda', createdAt: new Date().getTime() },
  { id: randomUUID(), name: 'Suzuki', createdAt: new Date().getTime() },
  { id: randomUUID(), name: 'Hyundai', createdAt: new Date().getTime() },
];
