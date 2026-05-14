import { Component, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

// --- IMPORTACIONES DE ANGULAR MATERIAL ---
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // <-- 1. Agrega esta línea

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule // <-- 2. Agrégalo a la lista aquí
  ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class SidenavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  menuNav = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Categorías", route: "category", icon: "category" },
    { name: "Productos", route: "product", icon: "shopping_cart" }
  ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showHelp() {
    console.log("¡Clic en el botón de ayuda detectado!"); // Mensaje espía
    this.snackBar.open('Sección de ayuda en construcción 🛠️', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  logout() {
    console.log("¡Clic en cerrar sesión detectado!"); // Mensaje espía

    // El .catch() evita que Angular se trabe si aún no existe la ruta '/'
    this.router.navigate(['/']).catch(err => {
      console.warn("No se pudo viajar a la raíz porque aún no hay pantalla de Login.");
    });
  }
}
