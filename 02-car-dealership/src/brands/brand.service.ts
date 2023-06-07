import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class BrandService {
  /*   private brands: BrandEntity[] = [
    { id: randomUUID(), name: 'Toyota', createdAt: new Date().getTime() },
  ]; */
  private brands: BrandEntity[] = [];

  findAll() {
    return this.brands;
  }

  findOne(id: string): BrandEntity {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id '${id}'not found`);
    return brand;
  }

  create(createBrandDto: CreateBrandDto) {
    const brand: BrandEntity = {
      id: randomUUID(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
      }
      return brand;
    });
    return brandDB;
  }

  remove(id: string) {
    this.findOne(id);
    const idx = this.brands.findIndex((brand) => brand.id === id);
    this.brands.splice(idx, 1);
  }

  fillBrandsWithSeedData(brands: BrandEntity[]) {
    this.brands = brands;
  }
}
