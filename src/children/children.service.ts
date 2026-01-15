/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {
  
  constructor(private readonly db:PrismaService) {}
  async assignToyToChild(kidId: number, toyId: number) {
    const kidfinder = await this.db.kid.findUnique({
      where: {
        id: kidId,
      },
    });
    if (!kidfinder) {
      //console.log('Toy not found');
      throw new Error(`Kid with id ${kidId} not found`);
    }
    const toyfinder = await this.db.toy.findUnique({
      where: {
        id: toyId,
      },
    });
    if (!toyfinder) {
      //console.log('Toy not found');
      throw new Error(`Toy with id ${toyId} not found`);
    }


    const assignment = await this.db.kid.update({
      where: {
        id: kidId,
      },
      data: {
        whishedFor: { connect: { id: toyId } },
      },
    });
    if (!assignment) {
      throw new Error(`Error assigning toy with id ${toyId} to kid with id ${kidId}`);
    }
    return assignment;
  }

  async getToysOfChild(id: number) {
    const kid = await this.db.kid.findUnique({
      where: {
        id: id,
      },
      include: {
        whishedFor: true,
      },
    });
    if (!kid) {
      throw new Error(`Kid with id ${id} not found`);
    }
    return kid.whishedFor;
  }

  async deassignToyToChild(kidId: number, toyId: number) {

    const kidfinder = await this.db.kid.findUnique({
      where: {
        id: kidId,
      },
    });
    if (!kidfinder) {
      //console.log('Toy not found');
      throw new Error(`Kid with id ${kidId} not found`);
    }
    const toyfinder = await this.db.toy.findUnique({
      where: {
        id: toyId,
      },
    });
    if (!toyfinder) {
      //console.log('Toy not found');
      throw new Error(`Toy with id ${toyId} not found`);
    }

    const deassignment = await this.db.kid.update({
      where: {
        id: kidId,
      },
      data: {
        whishedFor: { disconnect: { id: toyId } },
      },
    });
    if (!deassignment) {
      throw new Error(`Error deassigning toy with id ${toyId} to kid with id ${kidId}`);
    }
    return deassignment;
  }



  create(createChildDto: CreateChildDto) {
    return this.db.kid.create({
      data: createChildDto
    });
  }

  findAll() {
    return this.db.kid.findMany();
  }

  async getChildsToys(){
    return this.db.kid.findMany({
      omit: {location : true,wasGood : true},
      include: {
        whishedFor: true,
      },
      
    });
  }

  async findOne(id: number) {
    const finder = await this.db.kid.findUnique({
      where: {
        id: id,
      },
    });
    if (!finder) {
      //console.log('Toy not found');
      throw new Error(`Kid with id ${id} not found`);
    }
    return finder;
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    const updater = await this.db.kid.update({
      where: {
        id: id,
      },
      data: updateChildDto,
    });
    if (!updater) {
      throw new Error(`Kid with id ${id} not found`);
    }
    return updater; 
  }

  async remove(id: number) {
    const remover = await this.db.kid.delete({
      where: {
        id: id,
      },
    });
    if (!remover) {
      throw new Error(`Kid with id ${id} not found`);
    }
    return remover; 
  }
}
