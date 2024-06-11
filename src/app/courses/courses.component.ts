import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-courses',
  styleUrls: ['courses.component.scss'],
  templateUrl: 'courses.component.html',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
})
export class CoursesComponent implements AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'progression', 'subject', 'points', 'syllabus'];
  dataSource = new MatTableDataSource<Course>([]);

  constructor(private _liveAnnouncer: LiveAnnouncer, private coursesService: CoursesService) {}

  @ViewChild(MatSort) sort!: MatSort; // Ta bort manuell initialisering
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Ta bort manuell initialisering

  ngAfterViewInit() {
    this.coursesService.getCourses().subscribe(courses => {
      this.dataSource.data = courses;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; // Associera paginatorn med dataSource
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

