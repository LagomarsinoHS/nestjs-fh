import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getCars() {
    return this.carsService.getCars();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.getCarById(id);
  }

  @Post()
  postCar(@Body() payload: any) {
    return '';
  }

  @Put(':id')
  putCar(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return '';
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return '';
  }
}
