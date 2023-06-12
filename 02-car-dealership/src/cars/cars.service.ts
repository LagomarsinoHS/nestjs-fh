import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ICars } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: ICars[] = [];

  getCars() {
    return this.cars;
  }
  getCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  postCar(payload: CreateCarDTO) {
    const car: ICars = { id: randomUUID(), ...payload };
    this.cars.push(car);
    return car;
  }

  updateCar(id: string, payload: UpdateCarDTO) {
    let carDB = this.getCarById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...payload, id };
      }
      return car;
    });

    return carDB;
  }

  deleteCar(id: string) {
    this.getCarById(id);

    const idx = this.cars.findIndex((car) => car.id === id);
    this.cars.splice(idx, 1);
  }

  fillCarsWithSeedData(cars: ICars[]) {
    this.cars = cars;
  }
}
