import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AppStore } from "src/app/app.store";
import { AddTaskComponent } from "../add-task/add-task.component";
import { User } from "src/app/shared/interface";

@Component({
	selector: "app-task-detail",
	templateUrl: "./task-detail.component.html",
	styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
	constructor(
		private store: AppStore,
		private route: ActivatedRoute,
		private location: Location,
		public dialog: MatDialog
	) {}
	vm$ = this.store.vm$;

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get("id"));
		this.vm$.subscribe((res) => {
			if (res.tasks.length > 0 && res.users.length > 0 && !res.selectedTask) {
				this.store.selectTaskId(id);
			}
		});
	}

	goBack(): void {
		this.location.back();
	}

	ngOnDestroy(): void {
		this.store.clearSelectedTaskId();
	}

	toggleCompletion(taskId: number) {
		this.store.toggleCompletion(taskId);
	}

	openEditDialog(taskId: number, description: string, assigneeId: number, users: User[]) {
		const dialogRef = this.dialog.open(AddTaskComponent, {
			data: {
				users,
				description,
				assigneeId
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.store.updateTask({ taskId, description: result.description, assigneeId: result.selectedUser });
			}
		});
	}
}
