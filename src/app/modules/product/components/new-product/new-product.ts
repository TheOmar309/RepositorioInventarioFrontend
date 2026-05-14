import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material-module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // <-- Importamos MAT_DIALOG_DATA
import { ProductService } from '../../services/product';
import { CategoryService } from '../../../shared/services/category';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrls: ['./new-product.css']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;
  public categories: any[] = [];
  public selectedFile: File | null = null;
  public imageName: string = "";
  public tituloFormulario: string = "Agregar Nuevo"; // Título dinámico

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // <-- Aquí atrapamos los datos del producto a editar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required]
    });

    // Si "data" trae información, significa que le dimos clic a Editar
    if (this.data != null) {
      this.tituloFormulario = "Editar";
      // Llenamos el formulario automáticamente con los datos de tu producto
      this.productForm.patchValue({
        name: this.data.name,
        price: this.data.price,
        account: this.data.account,
        // Si tu backend manda la categoría como objeto, sacamos el ID
        category: this.data.category?.id
      });
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.categoryResponse.category;
      },
      (error: any) => console.error("Error al consultar categorias", error)
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      this.imageName = this.selectedFile.name;
    }
  }

  onSave() {
    if (this.productForm.invalid) return;

    const formData = new FormData();

    // Solo si subiste una foto nueva, la adjuntamos
    if (this.selectedFile != null) {
      formData.append('picture', this.selectedFile);
    }

    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('account', this.productForm.get('account')?.value);
    formData.append('categoryId', this.productForm.get('category')?.value);

    // ¿Estamos editando o creando?
    if (this.data != null) {
      // MODO EDICIÓN
      this.productService.updateProduct(formData, this.data.id).subscribe(
        (res: any) => this.dialogRef.close(1),
        (error: any) => console.error("Error al editar", error)
      );
    } else {
      // MODO CREACIÓN
      if (!this.selectedFile) return; // Si es nuevo, la foto es obligatoria
      this.productService.saveProduct(formData).subscribe(
        (res: any) => this.dialogRef.close(1),
        (error: any) => console.error("Error al guardar", error)
      );
    }
  }

  onCancel() {
    this.dialogRef.close(2);
  }
}
