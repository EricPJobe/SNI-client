import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private _token = signal<boolean>(false);
  private _user = signal<User | null>(null);

  token = computed(() => this._token());
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._token());

  constructor() {

  }

  login(token: string, user: User) {
    this._token.set(true);
    this._user.set(user);
    localStorage.setItem('token', token);
  }

  logout() {
    this._token.set(false);
    this._user.set(null);
    localStorage.removeItem('token');
  }

  getUser() {
    return this._user();
  }

  getUserId() {
    return this._user()?.id;
  }

  setUser(user: User) {
    this._user.set(user);
  }

  getToken() {
    return this._token();
  }
}

