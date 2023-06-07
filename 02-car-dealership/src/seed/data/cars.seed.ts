import { ICars } from 'src/cars/interfaces/car.interface';
import { randomUUID } from 'crypto';

export const CARS_SEED: ICars[] = [
  { id: randomUUID(), brand: 'Toyota', model: 'Corolla' },
  { id: randomUUID(), brand: 'Honda', model: 'Civic' },
  { id: randomUUID(), brand: 'Jeep', model: 'Cherokee' },
  { id: randomUUID(), brand: 'Peugeot', model: '208-GT' },
  { id: randomUUID(), brand: 'Suzuki', model: 'Swift' },
];
