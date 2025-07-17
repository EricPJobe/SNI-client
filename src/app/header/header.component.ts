import { Component } from '@angular/core';
import { ThemePickerComponent } from "../theme-picker/theme-picker.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-header',
  imports: [ThemePickerComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {


}
