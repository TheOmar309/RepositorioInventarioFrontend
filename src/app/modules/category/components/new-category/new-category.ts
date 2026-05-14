import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material-module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/category';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './new-category.html',
  styleUrls: ['./new-category.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  public tituloFormulario: string = "Agregar Nueva";

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.data != null) {
      this.tituloFormulario = "Editar";
      this.categoryForm.patchValue({
        name: this.data.name,
        description: this.data.description
      });
    }
  }

  ngOnInit(): void {}

  onSave() {
    if (this.categoryForm.invalid) return;

    // Aquí solo armamos un objeto simple (JSON), no un FormData porque no hay imagen
    const categoryData = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    if (this.data != null) {
      // Si tu backend tiene un método updateCategory, úsalo aquí
      this.categoryService.saveCategory(categoryData).subscribe(
        (res: any) => this.dialogRef.close(1),
        (error: any) => console.error("Error al actualizar", error)
      );
    } else {
      this.categoryService.saveCategory(categoryData).subscribe(
        (res: any) => this.dialogRef.close(1),
        (error: any) => console.error("Error al guardar", error)
      );
    }
  }

  onCancel() {
    this.dialogRef.close(2);
  }
}
