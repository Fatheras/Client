


import { Injectable } from '@angular/core';
import { ICategory } from '../models/Category';
import { Resolve } from '@angular/router';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryResolver implements Resolve<ICategory[]> {
    constructor(private categoryService: CategoryService) {

    }

    public resolve() {
        return this.categoryService.getAllCategories();
    }
}
