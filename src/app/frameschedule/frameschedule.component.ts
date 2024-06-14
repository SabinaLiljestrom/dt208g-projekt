import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { FramescheduleService } from '../services/frameschedule.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-frameschedule',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './frameschedule.component.html',
  styleUrl: './frameschedule.component.scss'
})
export class FramescheduleComponent implements OnInit {
  savedCourses: Course[] = [];
  totalPoints: number = 0;
  constructor(private FramescheduleService: FramescheduleService) {}

  ngOnInit(): void {
    this.FramescheduleService.getCourses().subscribe(courses => {
      this.savedCourses = courses;
    });
    this.FramescheduleService.getTotalPoints().subscribe(points => {
      this.totalPoints = points;
    });
  }
  removeCourse(courseCode: string) {
    this.FramescheduleService.removeCourse(courseCode);
  }
}