import { Component, Output, EventEmitter, Input, AfterContentInit } from '@angular/core';
import { ICategory } from 'src/app/+actual-tasks/models/Category';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent {

    @Input() public category: ICategory;
    url: string;
    @Output() categoryChanged: EventEmitter<ICategory> = new EventEmitter();
    change() {
        this.categoryChanged.emit(this.category);
    }
}
