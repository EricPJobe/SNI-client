import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-course-unit',
  imports: [],
  templateUrl: './language-course-unit.component.html',
  styleUrl: './language-course-unit.component.css'
})
export class LanguageCourseUnitComponent implements OnInit {
  unit = {
    title: 'Unit 1: Introduction to Language',
    description: 'Meet Andronicus and his family.'
  }

  ngOnInit() {
    console.log('Language Course Unit Component Initialized');
  }

  onNext() {
    console.log('Next button clicked');
    // Logic to navigate to the next unit
  }

  onPrevious() {
    console.log('Previous button clicked');
    // Logic to navigate to the previous unit
  }
}
