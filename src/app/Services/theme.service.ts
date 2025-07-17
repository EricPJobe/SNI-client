import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'dark' | 'light' = 'light';
  themes = ['dark', 'light'];

  constructor() {
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (storedTheme) {
      this.setTheme(storedTheme);
    }
  }

  setTheme(theme: 'dark' | 'light') {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme); // Set the class on the root
    localStorage.setItem('theme', theme); // Store the theme in localStorage
  }

  getTheme(): 'dark' | 'light' {
    return this.currentTheme;
  }

  getAllThemes() {
    return this.themes;
  }
}
