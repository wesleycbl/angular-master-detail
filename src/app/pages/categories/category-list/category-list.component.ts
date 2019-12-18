import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[] = [];

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        categories => this.categories = categories,
        error => alert(error)
      )
  }

  deleteCategory(category) {
    const mustDelete = confirm("Deseja realmente excluir esse item ?");
    if (mustDelete) {
      this.service.delete(category.id)
        .subscribe(
          () => this.categories = this.categories.filter(element => element != category),
          () => alert("Erro ao tentar excluir !")
        )
    }
  }

}
