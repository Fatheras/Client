import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from '../models/Category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private url: string = environment.url;

    constructor(private http: HttpClient) {
    }

    public getManagerCategories(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`${this.url}/manager/getAllManagerCategories`);
    }

    public getAllCategories(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`${this.url}/categories`);
    }

    public getCategory(id: number): Observable<ICategory> {
        return this.http.get<ICategory>(`${this.url}/categories/${id}`);
    }

    public getCategoriesWithStatistic(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`${this.url}/categories/getCategoriesWithStatistic`);
    }

    public addCategory(categoryName: string, managers): Observable<ICategory> {
        return this.http.post<ICategory>(`${this.url}/categories`, {managers: JSON.stringify(managers), categoryName} );
    }

    public deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/categories/${id}`);
    }
}
