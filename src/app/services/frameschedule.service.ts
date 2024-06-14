import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class FramescheduleService {
  private storageKey = 'savedCourses';
  private coursesSubject = new BehaviorSubject<Course[]>(this.getCoursesFromLocalStorage());
  private totalPointsSubject = new BehaviorSubject<number>(this.calculateTotalPoints(this.getCoursesFromLocalStorage()));

  constructor() {}

  private getCoursesFromLocalStorage(): Course[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private calculateTotalPoints(courses: Course[]): number {
    return courses.reduce((sum, course) => sum + course.points, 0);
  }

  getCourses() {
    return this.coursesSubject.asObservable();
  }

  getTotalPoints() {
    return this.totalPointsSubject.asObservable();
  }

  addCourse(course: Course) {
    const courses = this.getCoursesFromLocalStorage();
    courses.push(course);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
    this.coursesSubject.next(courses); // Uppdatera observablen
    this.totalPointsSubject.next(this.calculateTotalPoints(courses)); // Uppdatera poäng
  }

  removeCourse(courseCode: string) {
    let courses = this.getCoursesFromLocalStorage();
    courses = courses.filter(course => course.courseCode !== courseCode);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
    this.coursesSubject.next(courses); // Uppdatera observablen
    this.totalPointsSubject.next(this.calculateTotalPoints(courses)); // Uppdatera poäng
  }
}