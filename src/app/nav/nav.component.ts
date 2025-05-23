import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContextService } from '../Services/context.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isAuthenticated: boolean = false;
  context = inject(ContextService);
  isLoggedIn = this.context.isLoggedIn;

  constructor(){

  }
}
