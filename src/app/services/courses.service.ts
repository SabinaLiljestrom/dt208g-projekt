import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  //properties
  private url: string = '../assets/json/courses.json';
  constructor(private http: HttpClient) {}
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url); 
  }
}