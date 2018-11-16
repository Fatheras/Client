import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../../../user/models/User';
import { ManagerService } from '../../../user/services/manager.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
    public categories: ICategory[];
    public managers: IUser[];

    public categoryForm: FormGroup = new FormGroup({
        categoryName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        managers: new FormControl('', [Validators.required]),
    });

    constructor(private categoryService: CategoryService, private managerService: ManagerService) {

    }

    public save(): void {
        if (this.categoryForm.valid) {
            const categoryName = this.categoryForm.controls['categoryName'].value;
            const managers = this.categoryForm.controls['managers'].value;

            this.categoryService.addCategory(categoryName, managers).subscribe((category: ICategory) => {
                this.categories.push(category);
            });
        }
    }

    public cancel(): void {
        this.categoryForm.reset();
    }

    public delete(categoryId: number): void {
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
            this.categories = this.categories.filter((category) => category.id !== categoryId);
        });
    }

    ngOnInit(): void {
        this.categoryService.getCategoriesWithStatistic().subscribe((categories) => {
            this.categories = categories;
        });

        this.managerService.getAllManagers().subscribe((managers) => {
            this.managers = managers;
        });
    }
}
