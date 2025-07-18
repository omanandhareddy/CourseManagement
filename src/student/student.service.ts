import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './student.schemas/schemas';
import { CreateCourseDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const courseData = {
        ...createCourseDto,
        enrolledStudents: createCourseDto.enrolledStudents || 0,
        status: createCourseDto.status || 'Active',
      };

      const createdCourse = new this.courseModel(courseData);
      return await createdCourse.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course code already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateStudentDto): Promise<Course> {
    try {
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(id, updateCourseDto, { new: true })
        .exec();
      
      if (!updatedCourse) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      
      return updatedCourse;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course code already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return { message: 'Course deleted successfully' };
  }


  async findByDepartment(department: string): Promise<Course[]> {
    return await this.courseModel.find({ department }).exec();
  }


  async findByLevel(level: string): Promise<Course[]> {
    return await this.courseModel.find({ level }).exec();
  }

  async searchByTitle(title: string): Promise<Course[]> {
    return await this.courseModel
      .find({ title: { $regex: title, $options: 'i' } })
      .exec();
  }


  async findAllPaginated(page: number = 1, limit: number = 10): Promise<{
    courses: Course[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [courses, total] = await Promise.all([
      this.courseModel.find().skip(skip).limit(limit).exec(),
      this.courseModel.countDocuments().exec(),
    ]);

    return {
      courses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}