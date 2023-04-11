import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks = this.backend.tasks();

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
  }

}
