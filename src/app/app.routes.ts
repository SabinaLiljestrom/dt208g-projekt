import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { FramescheduleComponent } from './frameschedule/frameschedule.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'frameschedule', component: FramescheduleComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
