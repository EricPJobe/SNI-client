import { Component, inject, OnInit } from '@angular/core';
import { ContextService } from '../Services/context.service';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { MyCoursesComponent } from "../course-browser/my-courses/my-courses.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-student-home',
  imports: [MyCoursesComponent, SidebarComponent, ChatWindowComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit{
  contextService = inject(ContextService);
  coursesUrl = 'course';
  user: User | null = null;
  courses: Course[] | null = null;

  thread: Thread = {
    id: '1',
    name: 'Global Chat',
    type: 'public',
    ownerId: 'system',
    isPinned: true,
    isArchived: false,
    isLocked: false,
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor() {}

  ngOnInit() {
    this.user = this.contextService.getUser();
  }

}
