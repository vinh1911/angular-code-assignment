import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TaskListComponent } from './core/task-list/task-list.component';
import { TaskDetailComponent } from './core/task-detail/task-detail.component';
import { UserListComponent } from './core/user-list/user-list.component';
import { UserDetailComponent } from './core/user-detail/user-detail.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MaterialModule } from 'src/app/material.module';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { RoutingModule } from './routing.module';
import { SidenavService } from './layout/sidenav.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent,
    UserListComponent,
    UserDetailComponent,
    HeaderComponent,
    MenuComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    MaterialModule,
    RoutingModule
  ],
  providers: [BackendService, SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
