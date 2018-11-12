import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    public pattern = new FormControl('');

    @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit(): void {
        this.pattern.valueChanges.pipe(
            debounceTime(500),
        ).subscribe((data) => {
            this.searchChange.emit(this.pattern.value);
        });
    }
}
