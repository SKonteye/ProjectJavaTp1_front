import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  url = environment.apibaseUrl;
  // Example CRUD methods
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/listUsers' );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/userById/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/createUser', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/updateUser/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteUser/${id}`);
  }
}
