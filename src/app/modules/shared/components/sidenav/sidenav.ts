import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  menuNav=[
    { name: 'Home', route: 'home' , icon: 'home' },
    { name: 'Categorias', route: 'category', icon: 'category' },
    { name: 'Productos', route: 'product', icon: 'production_quantity_limits' },
  ];
  mobileQuery: MediaQueryList;
  constructor() {
    this.mobileQuery = window.matchMedia('(max-width: 600px)');
}
}
