import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private bearerToken = new BehaviorSubject<string>("Undefined");
  bearerTokenObservable = this.bearerToken.asObservable();
  
  constructor() { }

  changeBearerToken(bearerToken: any) {
    this.bearerToken.next(bearerToken);
  }

}
