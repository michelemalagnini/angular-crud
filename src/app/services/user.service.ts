import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://gorest.co.in/public/v2'; // base URL API
  // gorest token to the mock back end
  private authToken =
    'd01eee584a035b53e622fa0200366b0c8b8100be337042486060dc56ca3d9153';

  constructor(private http: HttpClient) {}

  /**
   * Get All Users
   */
  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users/`;
    return this.http.get<User[]>(url);
  }

  /**
   * Add User
   */
  addUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/users`;

    // Creating headers with the authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });

    return this.http.post<User>(url, user, { headers });
  }

  /**
   * Edit User
   */
  editUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/users/${user.id}`;

    // Creating headers with the authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });

    return this.http.patch<User>(url, user, { headers });
  }

  /**
   * Delete user
   */
  deleteUser(idToRemove: number): Observable<User> {
    const url = `${this.baseUrl}/users/${idToRemove}`;

    // Creating headers with the authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });

    return this.http.delete<User>(url, { headers });
  }
}
