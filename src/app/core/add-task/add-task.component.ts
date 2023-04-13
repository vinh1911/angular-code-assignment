import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "src/app/shared/interface";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.component.html",
	styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
	selectedUser = this.data.assigneeId ? this.data.assigneeId : null;
	description = this.data.description ? this.data.description : null;
	editMode = this.data.description ? true : false;

	ngOnInit(): void {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
