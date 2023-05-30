import { componentFactoryName } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AppStore } from "src/app/app.store";
import { SortOrder, TaskFilter, User } from "src/app/shared/interface";
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
	selector: "app-task-list",
	templateUrl: "./task-list.component.html",
	styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
	constructor(private store: AppStore, public dialog: MatDialog) {}
	vm$ = this.store.vm$;
	SortOrder = SortOrder;
	TaskFilter = TaskFilter;
	searchBox: string;

	ngOnInit(): void {}

	toggleCompletion(taskId: number) {
		this.store.toggleCompletion(taskId);
	}

	onChange(value: string) {
		this.store.setQuery(value);
	}

	toggleSort(sortOrder: SortOrder) {
		sortOrder = sortOrder === SortOrder.Newest ? SortOrder.Oldest : SortOrder.Newest;
		this.store.selectSortOrder(sortOrder);
	}

	onToggleGroupChange(value) {
		this.store.selectFilter(value);
	}

	openAddDialog(users: User[]) {
		console.log(users);
		const dialogRef = this.dialog.open(AddTaskComponent, {
			data: {
				users
			}
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.store.newTask({ description: result.description, assigneeId: result.selectedUser });
			}
		});
	}

	selectTask(taskId: number) {
		this.store.selectTaskId(taskId);
	}
}
