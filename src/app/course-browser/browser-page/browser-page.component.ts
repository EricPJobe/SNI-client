import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ContextService } from '../../Services/context.service';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-browser-page',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './browser-page.component.html',
  styleUrl: './browser-page.component.css'
})
export class BrowserPageComponent implements OnInit {
  searchTerm: any;
  selectedCourse: any;
  faMagnifyingGlass = faMagnifyingGlass;
  contextService = inject(ContextService);
  dataService = inject(DataService);
  router = inject(Router);
  http = inject(HttpClient);
  coursesUrl = 'course';
  user: User | null = null;
  courses: Course[] | null = null;

 ngOnInit() {
    this.user = this.contextService.getUser();
    if (!this.user && !this.contextService.isLoggedIn()) {
      console.error('User not authenticated');
      return;
    }
    if (!this.user && this.contextService.isLoggedIn()) {
      console.log('User not found, fetching from server');
      const id = this.contextService.getUserId();
      this.http.get(this.dataService.findPath+'auth/'+id).pipe(
              catchError(err => {
                console.error(err);
                return throwError(() => new Error("Authentication failed."));
              })
            )
      .subscribe((resp: any) => {
        // console.log(resp);
        this.user = resp;
        if (this.user) {
          this.user.id = resp.appUserId;
          this.contextService.setUser(this.user);
        } else {
          console.error('User not found');
        }
        // this.courses = this.user?.courses;
      });
    }
    // console.log('User:')
    // console.log(this.user);

    this.http.get(this.dataService.findPath + this.coursesUrl).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error("Failed to fetch courses."));
      })
    ).subscribe((resp: any) => {
      // console.log(resp);
      this.courses = resp;
    });

  }

  onCourseSelect(course: any) {
    throw new Error('Method not implemented.');
  }

  onSearch() {
    throw new Error('Method not implemented.');
  }

  onStartCourse(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
