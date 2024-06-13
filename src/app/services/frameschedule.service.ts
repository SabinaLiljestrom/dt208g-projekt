import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class FramescheduleService {
  private storageKey = 'savedCourses';
  private coursesSubject = new BehaviorSubject<Course[]>(this.getCoursesFromLocalStorage());

  constructor() { }
  private getCoursesFromLocalStorage(): Course[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
}
getCourses() {
  return this.coursesSubject.asObservable();
}

addCourse(course: Course) {
  const courses = this.getCoursesFromLocalStorage();
  courses.push(course);
  localStorage.setItem(this.storageKey, JSON.stringify(courses));
  this.coursesSubject.next(courses); // Uppdatera observablen
}
}
