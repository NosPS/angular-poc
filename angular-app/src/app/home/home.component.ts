import { Component } from '@angular/core';
import { StoreService } from 'src/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public storeService: StoreService) {}
}
