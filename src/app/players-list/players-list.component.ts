import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  @Input() players: any;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getImage(playerName) {
    playerName=playerName.replace(/[^a-zA-Z ]/g, "");
    return `url("../../assets/pictures/${playerName}.png")`;
  }

}
