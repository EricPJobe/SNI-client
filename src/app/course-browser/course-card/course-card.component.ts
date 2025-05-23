import { Component, Input } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { Course } from '../../models/course.model';


@Component({
  selector: 'app-course-card',
  imports: [CdkAccordionModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course: Course | null = null;


  addToCart(arg0: Course) {
    throw new Error('Method not implemented.');
  }
}
