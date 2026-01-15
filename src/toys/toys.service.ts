/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ToysService {
  constructor (private readonly db: PrismaService) {}
  create(createToyDto: CreateToyDto) {
    return this.db.toy.create({
      data: {name: createToyDto.name, material: createToyDto.material, weight: createToyDto.weight},
    })
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    const finder = await this.db.toy.findUnique({
      where: {
        id: id,
      },
    });
    if (!finder) {
      //console.log('Toy not found');
      throw new Error(`Toy with id ${id} not found`);
    }
    return finder;
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    const finder = await this.db.toy.findUnique({
      where: {
        id: id,
      },
    });
    if (!finder) {
      //console.log('Toy not found');
      throw new Error(`Toy with id ${id} not found`);
    }
    try{
      const updater = await this.db.toy.update({
        where: {
          id: id,
        },
        data: {
          name: updateToyDto.name ? updateToyDto.name : undefined,
          material: updateToyDto.material ? updateToyDto.material : undefined,
          weight: updateToyDto.weight? updateToyDto.weight : undefined,
        },
      });
      if (!updater) {
        throw new Error(`Toy with id ${id} not found`);
      }
      return updater; 
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async remove(id: number) {
    const remover = await this.db.toy.delete({
      where: {
        id: id,
      },
    });
    if (!remover) {
      throw new Error(`Toy with id ${id} not found`);
    }
    return remover; 
  }
}
