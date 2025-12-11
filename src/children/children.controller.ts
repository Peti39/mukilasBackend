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

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
    return this.childrenService.findOne(+id);
    } catch (error) {
          throw new HttpException({error: `Kid with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    try {
    return this.childrenService.update(+id, updateChildDto);
    } catch (error) {
          throw new HttpException({error: `Kid with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
    return this.childrenService.remove(+id);
    } catch (error) {
          throw new HttpException({error: `Kid with id ${id} not found. Error:${error}`}, 404);
    }
  }

  @Put(':id/toys/:toyId')
  assignToyToChild(@Param('id') id: string, @Param('toyId') toyId: string) {
    try {
      return this.childrenService.assignToyToChild(+id, +toyId);
    } catch (error) {
      throw new HttpException({error: `Error assigning toy with id ${toyId} to kid with id ${id}. Error:${error}`}, 404);
    }
  }

  @Delete(':id/toys/:toyId')
  deassignToyToChild(@Param('id') id: string, @Param('toyId') toyId: string) {
    try {
      return this.childrenService.deassignToyToChild(+id, +toyId);
    } catch (error) {
      throw new HttpException({error: `Error deassigning toy with id ${toyId} to kid with id ${id}. Error:${error}`}, 404);
    }
  }


}
