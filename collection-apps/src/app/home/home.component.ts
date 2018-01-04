import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mode:any = {
    card: true,
    list: false
  };

  constructor() { }

  ngOnInit() {
  }

  changeHomeMode(mode: string) {
    if(mode.toLowerCase() === 'list') {
      this.mode.list = true;
      this.mode.card = false;
    }
    else {
      this.mode.list = false;
      this.mode.card = true;
    }
  }
}
