/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get('toys')
  async getChildsToys() {
    return this.childrenService.getChildsToys();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
    return await this.childrenService.findOne(+id);
    } catch (error) {
          throw new HttpException({error: `Kid with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    try {
    return await this.childrenService.update(+id, updateChildDto);
    } catch (error) {
          throw new HttpException({error: `Kid with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
    return await this.childrenService.remove(+id);
    } catch (error) {
          throw new HttpException({error: `Kid with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Get(':id/toys')
  async getToysOfChild(@Param('id') id: string) {
    try {
      return await this.childrenService.getToysOfChild(+id);
    } catch (error) {
      throw new HttpException({error: `Error retrieving toys of kid with id ${id}. Error:${error}`}, 404);
    }
  }

  

  @Put(':id/toys/:toyId')
  async assignToyToChild(@Param('id') id: string, @Param('toyId') toyId: string) {
    try {
      return await this.childrenService.assignToyToChild(+id, +toyId);
    } catch (error) {
      throw new HttpException({error: `Error assigning toy with id ${toyId} to kid with id ${id}. Error:${error}`}, 404);
    }
  }

  @Delete(':id/toys/:toyId')
  async deassignToyToChild(@Param('id') id: string, @Param('toyId') toyId: string) {
    try {
      return await this.childrenService.deassignToyToChild(+id, +toyId);
    } catch (error) {
      throw new HttpException({error: `Error deassigning toy with id ${toyId} to kid with id ${id}. Error:${error}`}, 404);
    }
  }


}
