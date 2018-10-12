import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-me',
    templateUrl: './me.component.html'
})
export class MeComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {

    }
}
