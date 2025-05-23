import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginComponent } from './login/login.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { LanguageCourseUnitComponent } from './language-course/language-course-unit/language-course-unit.component';
import { BrowserPageComponent } from './course-browser/browser-page/browser-page.component';
import { MyCoursesComponent } from './course-browser/my-courses/my-courses.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'studenthome', component: StudentHomeComponent, canActivate: [AuthGuard]},
  {path: 'adminhome', component: AdminHomeComponent, canActivate: [AuthGuard]},
  {path: 'languagecourse/:language', component: LanguageCourseUnitComponent, canActivate: [AuthGuard]},
  {path: 'browse', component: BrowserPageComponent, canActivate: [AuthGuard]},
  {path: 'courses', component: MyCoursesComponent, canActivate: [AuthGuard]},
];
