import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Necesario para el *ngIf
import { MaterialModule } from '../../../shared/material-module'; // <-- Tu archivo de Material
import { ProductService } from '../../services/product'; // Revisa que la ruta esté bien
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewProductComponent } from '../new-product/new-product'; // <-- Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-product',
  standalone: true, // <-- Esto le dice a Angular que se manda solo
  imports: [CommonModule, MaterialModule], // <-- ¡Aquí le inyectamos los superpoderes de Material!
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {

  // Definimos las columnas que se van a mostrar
  displayedColumns: string[] = ['id', 'picture', 'name', 'price', 'account', 'category', 'actions'];

  // Usamos MatTableDataSource para que Angular Material haga la magia de paginar
  dataSource = new MatTableDataSource<any>();

  // Referencia al paginador del HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px' // Le damos un ancho fijo para que se vea elegante
    });

    // Escuchamos cuando la ventana se cierre
    dialogRef.afterClosed().subscribe((result: any) => {
      // Si el resultado es 1 (como lo configuramos en new-product.ts), significa que se guardó bien
      if (result === 1) {
        this.getProducts(); // Refrescamos la tabla automáticamente para ver el nuevo producto
      }
    });
  }

  // Función para abrir el modal en modo Edición
  editProduct(product: any) {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: product // <-- ¡Aquí le inyectamos los datos del producto a la ventana!
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.getProducts(); // Refrescamos la tabla si se guardaron los cambios
      }
    });
  }

  // Función para eliminar un producto
  deleteProduct(product: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this.getProducts(); // Refrescamos la tabla después de eliminar
        },
        (error: any) => {
          console.error("Error al eliminar el producto", error);
        }
      );
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        console.log("Respuesta del backend: ", data);
        this.dataSource.data = data.product.product;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error("Error al obtener los productos", error);
      }
    );
  }
  // --- FUNCIÓN PARA EL BUSCADOR ---
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Como productos sí tiene paginación, si buscamos algo, regresamos a la página 1
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
