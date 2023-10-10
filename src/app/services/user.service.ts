import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl="http://localhost:3000/users";
  private currentUserSubject:BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`)
      .pipe(map(users => {
        const user = users.find(u => u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        return null;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.currentUserValue.id;
  }

}
