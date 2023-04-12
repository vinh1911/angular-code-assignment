import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { BackendService} from "src/app/backend.service";
import { Location } from "@angular/common";
import { Task } from "src/app/shared/interface";

@Component({
	selector: "app-task-detail",
	templateUrl: "./task-detail.component.html",
	styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
	task: Observable<Task>;
	constructor(
		private backend: BackendService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get("id"));
		this.task = this.backend.task(id);
	}

	goBack(): void {
		this.location.back();
	}
}
