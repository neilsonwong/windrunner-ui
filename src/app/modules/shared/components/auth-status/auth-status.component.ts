import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.scss']
})
export class AuthStatusComponent implements OnInit {
  public authContext: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authContext = this.authService.authContext$;
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }
}
