import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Peugeot', 'Ford', 'Chevrolet'];
  @Get()
  getCars() {
    return this.cars;
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.cars[id] || 'Not found';
  }
}
