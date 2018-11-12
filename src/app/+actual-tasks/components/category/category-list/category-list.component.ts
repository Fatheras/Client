import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategory } from '../../../../models/Category';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
    @Input() public categories: ICategory[];
    @Output() public categoryChanged: EventEmitter<ICategory> = new EventEmitter();

    public change(category: ICategory) {
        this.categoryChanged.emit(category);
    }
}
