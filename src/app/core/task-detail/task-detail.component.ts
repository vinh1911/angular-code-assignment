import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppStore } from "src/app/app.store";

@Component({
	selector: "app-task-detail",
	templateUrl: "./task-detail.component.html",
	styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
	constructor(private store: AppStore, private route: ActivatedRoute, private location: Location) {}
	vm$ = this.store.vm$;

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get("id"));
		this.vm$.subscribe((res) => {
			if (res.tasks.length > 0 && res.selectedTask === null) {
				this.store.selectTask(id);
			}
		});
	}

	goBack(): void {
		this.location.back();
	}

	ngOnDestroy(): void {
		this.store.clearSelectedTask();
	}
}
