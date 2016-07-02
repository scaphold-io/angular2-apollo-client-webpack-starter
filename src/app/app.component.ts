import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from './shared';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [AuthService],
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://scaphold.io';
  auth: any;

  constructor(auth: AuthService) {
    this.auth = auth;
  }
}
