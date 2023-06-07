import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getCars() {
    return this.carsService.getCars();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.getCarById(id);
  }

  @Post()
  postCar(@Body() payload: CreateCarDTO) {
    return this.carsService.postCar(payload);
  }

  @Patch(':id')
  putCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCarDTO,
  ) {
    return this.carsService.updateCar(id, payload);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
