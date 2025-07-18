import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  credits: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'])
  department: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['Undergraduate', 'Graduate', 'PhD'])
  level: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(8)
  semester: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(200)
  maxStudents: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  enrolledStudents?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  instructor: string;

  @IsOptional()
  @IsString()
  @IsEnum(['Active', 'Inactive', 'Archived'])
  status?: string;
}