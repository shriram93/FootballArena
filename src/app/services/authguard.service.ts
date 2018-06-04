import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private dataService: DataService) { }
  canActivate() {
    this.dataService.bearerTokenObservable.subscribe(token => {
      if (token == "Undefined") {
        this.router.navigate(['/']);
      }
    });
    return true;
  }
}
