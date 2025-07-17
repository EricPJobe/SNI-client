import { Component, inject, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ContextService } from '../../Services/context.service';
import { DataService } from '../../Services/data.service';
import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-courses',
  imports: [MatIconModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit{
  contextService = inject(ContextService);
  baseUrl = this.contextService.baseApiUrl();
  dataService = inject(DataService);
  router = inject(Router);
  http = inject(HttpClient);
  coursesUrl = 'course/my-courses';
  user: User | null = null;
  courses: Course[] | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.contextService.getUser();
    if (!this.user || !this.contextService.isLoggedIn()) {
      console.error('User not authenticated');
      return;
    }

    this.http.get(`${this.dataService.findPath + this.coursesUrl}/${this.user.accountId}`).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error("Failed to fetch courses."));
      })
    ).subscribe((resp: any) => {
      // console.log(resp);
      this.courses = resp;
    });

  }

  navigateToCourse(id: string) {
    // console.log('Navigating to course: ', id);
    this.router.navigate(['/languagecourse', 'greek']);// Implement navigation logic here
  }

  navigateToAllRecentCourses() {
    // this.router.navigate(['/languagecourse', 'greek']);// Implement navigation logic here
  }
}

