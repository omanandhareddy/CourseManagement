import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { CreateCourseDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CoursesService } from './student.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('all')
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    if (page && limit) {
      return this.coursesService.findAllPaginated(+page, +limit);
    }
    return this.coursesService.findAll();
  }

  @Get('search')
  searchByTitle(@Query('title') title: string) {
    return this.coursesService.searchByTitle(title);
  }

  @Get('department/:department')
  findByDepartment(@Param('department') department: string) {
    return this.coursesService.findByDepartment(department);
  }

  @Get('level/:level')
  findByLevel(@Param('level') level: string) {
    return this.coursesService.findByLevel(level);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCourseDto: UpdateStudentDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}