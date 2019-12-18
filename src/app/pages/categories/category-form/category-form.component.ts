import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

import toastr from 'toastr';

import { switchMap } from 'rxjs/operators';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  public currentAction: string;
  public categoryForm: FormGroup;
  public pageTilte: string;
  public serverErrorMessages: string[] = null;
  public submittingForm: boolean = false;
  public category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.setCurrentAction();
    // this.buildCategoryForm();
    // this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }


  // PRIVATE METHODS

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required, Validators.minLength(2)],
      description: [null]
    })
  }


  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getFindById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category)
        },
        (error) => alert("Ocorreu um erro no servidor !")
      )
    }
  }


  private setPageTitle() {
    if (this.currentAction == "new")
      this.pageTilte = "Cadastro de nova Categoria"
    else {
      const categoryName = this.category.name || ""
      this.pageTilte = "Editando Categoria: " + categoryName;
    }

  }
}
