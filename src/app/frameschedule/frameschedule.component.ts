import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { FramescheduleService } from '../services/frameschedule.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frameschedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frameschedule.component.html',
  styleUrl: './frameschedule.component.scss'
})
export class FramescheduleComponent implements OnInit {
  savedCourses: Course[] = [];
  constructor(private FramescheduleService: FramescheduleService) {}

  ngOnInit(): void {
    this.FramescheduleService.getCourses().subscribe(courses => {
      this.savedCourses = courses;
    });
  }
  removeCourse(courseCode: string) {
    this.FramescheduleService.removeCourse(courseCode);
  }
}