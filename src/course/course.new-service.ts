import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";
import { courseToUpper } from "src/helper-methods/helpers";

@Injectable()
export class CourseService {
    constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) { }

    async create(course: Course) {
        course.name = courseToUpper(course.name);
        return await this.courseRepository.save(course);
    }
}