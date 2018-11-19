


import { Injectable } from '@angular/core';
import { ICategory } from '../models/Category';
import { Resolve } from '@angular/router';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryResolver implements Resolve<ICategory[]> {
    constructor(private categoryService: CategoryService) {

    }

    public resolve(): Observable<ICategory[]> {
        return this.categoryService.getAllCategories();
    }
}
