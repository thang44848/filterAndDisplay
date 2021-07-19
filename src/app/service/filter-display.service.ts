import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FilterDisplayService {

    constructor(
      private readonly http: HttpClient
    ) { }

    getListOfDisplayingItems(): Observable<any> {
        return this.http.get<any>('https://api.publicapis.org/categories');
    }
}
