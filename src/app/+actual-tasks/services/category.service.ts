import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from '../models/Category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private url: string = environment.url;

    constructor(private http: HttpClient) {
    }
    getAllCategories(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`${this.url}/categories`);
    }
    getCategory(id: number): Observable<ICategory> {
        return this.http.get<ICategory>(`${this.url}/categories/${id}`);
    }
}
