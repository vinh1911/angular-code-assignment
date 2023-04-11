import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './core/task-list/task-list.component';
import { TaskDetailComponent } from './core/task-detail/task-detail.component';
import { UserListComponent } from './core/user-list/user-list.component';
import { UserDetailComponent } from './core/user-detail/user-detail.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'tasks', component:  TaskListComponent},
  { path: 'tasks/:id', component:  TaskDetailComponent},
  { path: 'users', component:  UserListComponent},
  { path: 'users/:id', component:  UserDetailComponent},
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component:  PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
