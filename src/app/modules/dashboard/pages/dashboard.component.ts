import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}
