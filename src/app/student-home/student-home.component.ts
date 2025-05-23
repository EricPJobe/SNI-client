import { Component, inject, OnInit } from '@angular/core';
import { ContextService } from '../Services/context.service';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { MyCoursesComponent } from "../course-browser/my-courses/my-courses.component";

@Component({
  selector: 'app-student-home',
  imports: [MyCoursesComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit{
  contextService = inject(ContextService);
  coursesUrl = 'course';
  user: User | null = null;
  courses: Course[] | null = null;

  constructor() {}

  ngOnInit() {
    this.user = this.contextService.getUser();
  }

}
