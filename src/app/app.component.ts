import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from './core/services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private apiService: ApiService){

  }

  ngOnInit(): void {
  }
}