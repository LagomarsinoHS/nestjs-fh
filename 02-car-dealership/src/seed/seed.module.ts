import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { SeedService } from './seed.service';
import { BrandsModule } from 'src/brands/brand.module';

@Module({
  imports: [CarsModule, BrandsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
