import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {

  @ViewChild('snav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {
  }
  
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
