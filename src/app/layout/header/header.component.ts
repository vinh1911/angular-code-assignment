import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SidenavService } from "../sidenav.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent{

  constructor(
    private sidenav: SidenavService) { }
    
    toggleMenu() {
       this.sidenav.toggle();
    }
    
}
