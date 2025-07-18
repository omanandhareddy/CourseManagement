import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, minlength: 2, maxlength: 100 })
  title: string;

  @Prop({ required: true, minlength: 10, maxlength: 500 })
  description: string;

  @Prop({ required: true, unique: true, minlength: 3, maxlength: 20 })
  code: string;

  @Prop({ required: true, min: 1, max: 10 })
  credits: number;

  @Prop({ 
    required: true, 
    enum: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] 
  })
  department: string;

  @Prop({ 
    required: true, 
    enum: ['Undergraduate', 'Graduate', 'PhD'] 
  })
  level: string;

  @Prop({ required: true, min: 1, max: 8 })
  semester: number;

  @Prop({ required: true, min: 1, max: 200 })
  maxStudents: number;

  @Prop({ default: 0, min: 0 })
  enrolledStudents: number;

  @Prop({ required: true })
  instructor: string;

  @Prop({ 
    required: true, 
    enum: ['Active', 'Inactive', 'Archived'] 
  })
  status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);