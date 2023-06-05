import { Module } from '@nestjs/common';
import { CarsModule } from './src/cars/cars.module';

@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
