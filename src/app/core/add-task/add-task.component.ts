import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "src/app/shared/interface";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.component.html",
	styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: User[]) {}
	selectedUser: number;
	description: string;

	ngOnInit(): void {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
