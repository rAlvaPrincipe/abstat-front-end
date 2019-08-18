import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {TOKEN_NAME} from '../auth.constant'
@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html'
})
export class TemplateHeaderComponent {

  constructor(private router: Router, private userService: UserService, private cdRef:ChangeDetectorRef) { }

  ngAfterViewChecked() {
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    this.cdRef.detectChanges();
  }

  logout() {
    this.userService.logout();
  }

  check(): boolean {
    if(localStorage.getItem(TOKEN_NAME)) {
      return true;
    }
    return false;
  }
}
