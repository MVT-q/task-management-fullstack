import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  
}
