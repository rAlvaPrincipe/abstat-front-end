import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-template-menu',
  templateUrl: './template-menu.component.html'
})
export class TemplateMenuComponent implements OnInit {
  show_control_routes: boolean;

  constructor() {
    this.show_control_routes = environment.mode != 'public';   // show only if environment mode is not "public"
  }

  ngOnInit() {
  }

}
