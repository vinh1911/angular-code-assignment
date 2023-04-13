import { Component, OnInit } from "@angular/core";
import { AppStore } from "./app.store";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	providers: [AppStore],
})
export class AppComponent implements OnInit {
	isLoading$ = this.store.isLoading$;
	constructor(private readonly store: AppStore) {}

	ngOnInit(): void {
		this.store.loadUsers();
		this.store.loadTasks();
	}
}
