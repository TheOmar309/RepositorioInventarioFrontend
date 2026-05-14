import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../shared/services/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // <-- Agregamos MatDialog
import { NewCategoryComponent } from '../new-category/new-category'; // <-- Asegúrate de que la ruta a tu modal sea correcta

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule // <-- Importante para que el modal funcione
  ],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog); // <-- Inyectamos el servicio para abrir ventanas

  ngOnInit(): void {
    this.getCategories();
  }

  displayColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data:any) => {
        console.log("respuesta categories:", data);
        this.processCategoriesResponse(data);
      }, (error:any) => {
        console.log("Error:", error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  processCategoriesResponse(resp:any){
    if(resp.metadata[0].code === "00"){
      this.dataSource.data = resp.categoryResponse.category;
    }
  }

  // --- NUEVAS FUNCIONES PARA LOS BOTONES ---

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.getCategories(); // Refresca la tabla si se guardó con éxito
      }
    });
  }

  editCategory(element: CategoryElement) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: element // Le pasamos los datos para rellenar el formulario
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.getCategories();
      }
    });
  }

  deleteCategory(element: CategoryElement) {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría ${element.name}?`)) {
      // Asumiendo que tienes un método deleteCategory en tu CategoryService
      this.categoryService.deleteCategory(element.id).subscribe(
        () => {
          this.getCategories(); // Refresca la tabla
        },
        (error: any) => {
          console.error("Error al eliminar la categoría", error);
        }
      );
    }
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
