import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      MongooseModule.forRootAsync({
      useFactory: () => ({
      uri: process.env.MONGO_URL,
      }),
      }),
    CoursesModule,
  ],
})
export class AppModule {}