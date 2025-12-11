/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';



@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Get()
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.toysService.findOne(+id)
      return result;
    } catch (error) {
      throw new HttpException({error: `Toy with id ${id} not found. Error:${error}`}, 404);
    }
    
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
     try {
    return this.toysService.update(+id, updateToyDto);
    } catch (error) {
      throw new HttpException({error: `Toy with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
     try {
    return this.toysService.remove(+id);
    } catch (error) {
      throw new HttpException({error: `Toy with id ${id} not found. Error:${error}`}, 404);
    }
  }
}
