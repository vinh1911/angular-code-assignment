import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { TaskDetailComponent } from './core/task-detail/task-detail.component';
import { TaskListComponent } from './core/task-list/task-list.component';
import { UserDetailComponent } from './core/user-detail/user-detail.component';
import { UserListComponent } from './core/user-list/user-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { SidenavService } from './layout/sidenav.service';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent,
    UserListComponent,
    UserDetailComponent,
    HeaderComponent,
    MenuComponent,
    PageNotFoundComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [BackendService, SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
