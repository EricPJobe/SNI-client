import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-theme-picker',
  imports: [],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.css'
})
export class ThemePickerComponent implements OnInit {

  themeService = inject(ThemeService);
  themes: string[] = [];
  selectedTheme: 'dark' | 'light' | null = null;

  ngOnInit() {
    this.themes = this.themeService.getAllThemes();
    this.selectedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (this.selectedTheme) {
      this.themeService.setTheme(this.selectedTheme);
    }
  }

  setTheme(theme: any) {
    this.themeService.setTheme(theme);
  }
}
