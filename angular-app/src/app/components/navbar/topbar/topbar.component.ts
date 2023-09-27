import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  constructor(private router: Router) {}
  onHomeClick() {
    this.router.navigate(['/']);
  }

  onUserClick() {
    this.router.navigate(['/user']);
  }
}
