import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-student.dto';


export class UpdateStudentDto extends PartialType(CreateCourseDto) {}
