import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  styleUrls: ['courses.component.scss'],
  templateUrl: 'courses.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule, MatFormFieldModule, FormsModule],
})
export class CoursesComponent implements AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'progression', 'subject', 'points', 'syllabus']; //olika kolumner i tabellen
  dataSource = new MatTableDataSource<Course>([]);
  subjects: string[] = []; // Array för att hålla unika ämnen
  courses: Course[] = [];
  searchedCourses: Course[] = [];
  filterValue: string = "";
  constructor(private _liveAnnouncer: LiveAnnouncer, private coursesService: CoursesService) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.coursesService.getCourses().subscribe(courses => {
      this.dataSource.data = courses;
      this.courses = courses;
      this.searchedCourses = courses;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 10;

      // Hämta unika ämnen
      this.subjects = [...new Set(courses.map(course => course.subject))];
      console.log('Subjects:', this.subjects); // Loggar ämnena i arrayen
    });
  }

  applyFilter(subject: string) {
    this.dataSource.filterPredicate = (data: Course, filter: string) => data.subject === filter;
    this.dataSource.filter = subject;
  }
  applySearch(): void {
    const filterValueLower = this.filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValueLower;
    this.dataSource.filterPredicate = (data: Course, filter: string) => {
      return data.courseCode.toLowerCase().includes(filter) ||
             data.courseName.toLowerCase().includes(filter);
    };
  }
  /** sortering **/
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
