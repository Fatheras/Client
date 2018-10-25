import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategory } from 'src/app/+actual-tasks/models/Category';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent  {

    @Input() public categories: ICategory[];
    @Output() categoryChanged: EventEmitter<number> = new EventEmitter();


    change(category: number) {
         this.categoryChanged.emit(category);
     }
}
