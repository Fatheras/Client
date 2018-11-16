import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ICategory } from 'src/app/models/Category';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent {
    @Input() public category: ICategory;
    @Output() public categoryChanged: EventEmitter<ICategory> = new EventEmitter();

    public change(): void {
        this.categoryChanged.emit(this.category);
    }
}
