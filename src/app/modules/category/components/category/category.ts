import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../shared/services/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


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
  MatTableModule
  ],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getCategories();
  }

  displayColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource=new MatTableDataSource<CategoryElement>();

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data:any) => {
        console.log("respuesta categories:", data);
        this.processCategoriesResponse(data);
      }, (error:any) => {
        console.log("Error:", error);
      });
  }

processCategoriesResponse(resp:any){
  if(resp.metadata[0].code === "00"){
    this.dataSource.data = resp.categoryResponse.category;
  }
}

}
export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
