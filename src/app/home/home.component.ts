import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  campus: string ="assets/images/campus.jpg";
  books: string ="assets/images/books.png";
  students: string ="assets/images/students.png";
  gym: string ="assets/images/gym.png";
}
