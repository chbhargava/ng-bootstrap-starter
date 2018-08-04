import { Component, OnInit } from '@angular/core';
import { APP_TITLE } from '../../../app.constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appTitle = APP_TITLE;
  constructor() { }

  ngOnInit() { }

}
