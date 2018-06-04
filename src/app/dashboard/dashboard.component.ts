import { Component, OnInit } from '@angular/core';
import { GyanmatrixService } from '../services/gyanmatrix.service';
import { DataService } from '../services/data.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allPlayers = [];
  currentPageItems = [];
  //pagaintion
  limit = 10;
  page = 1;
  total = 0;

  myControl: FormControl = new FormControl();

  filteredPlayers: Observable<string[]>;

  bearerToken: any;
  constructor(private gyanmatrixService: GyanmatrixService, private dataService: DataService) {
    this.dataService.bearerTokenObservable.subscribe(
      token => this.bearerToken = token
    );
  }

  ngOnInit() {
    this.gyanmatrixService.getAllPlayers(this.bearerToken).subscribe(
      res => {
        this.allPlayers = res;
        this.getPlayers();
      },
      err => {
        console.log(err);
      }
    );
    this.filteredPlayers = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    if (val == '')
    {
      this.getPlayers();
    }    
    return this.allPlayers.filter(option =>
      option.Name.toLowerCase().includes(val.toLowerCase()));
  }


  getPlayers(): void {
    let currentPage = this.page - 1;
    this.currentPageItems = this.allPlayers.slice(currentPage * this.limit, (currentPage + 1) * this.limit);
    this.total = this.allPlayers.length;
  }

  goToPage(n: number): void {
    this.page = n;
    this.getPlayers();
  }

  onNext(): void {
    this.page++;
    this.getPlayers();
  }

  onPrev(): void {
    this.page--;
    this.getPlayers();
  }

  goToPlayer(playerName) {
    this.currentPageItems = [];
    this.allPlayers.forEach(player => {
      if (player.Name == playerName) {
        this.currentPageItems.push(player);
        this.total = 1;
      }
    });
  }

}
