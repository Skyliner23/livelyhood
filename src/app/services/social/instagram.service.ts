import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(private http: HttpClient) { }

  // examples: https://developers.facebook.com/docs/instagram/embedding
  // https://api.instagram.com/oembed/?url=https://www.instagram.com/p/fA9uwTtkSN/
  fetchInstagramFeed(id: string): Observable<any> {
    return this.http.get('https://api.instagram.com/oembed?url=' + id);
  };

}
