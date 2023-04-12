import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Task, User } from "./shared/interface";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */
function randomDelay() {
	return Math.random() * 1000;
}

@Injectable()
export class BackendService {
	storedUsers: User[] = [
		{ id: 1, name: "Spongebob", image: "./assets/spongebob.png" },
		{ id: 2, name: "Patrick", image: "./assets/patrick.png" },
		{ id: 3, name: "Squidward", image: "./assets/squidward.png" },
		{ id: 4, name: "Mr. Krabs", image: "./assets/mr-krabs.png" },
		{ id: 5, name: "Sandy Cheecks", image: "./assets/sandy.png" },
		{ id: 6, name: "Plankton", image: "./assets/plankton.png" },
		{ id: 7, name: "Gary", image: "./assets/gary.png" },
		{ id: 8, name: "Pearl", image: "./assets/pearl.png" },
		{ id: 9, name: "Karen", image: "./assets/karen.png" },
		{
			id: 10,
			name: "Handsome Squidward",
			image: "./assets/handsome-squidward.png",
		},
		{ id: 11, name: "Mermaid Man", image: "./assets/mermaid-man.png" },
		{ id: 12, name: "Dirty Bubble", image: "./assets/dirty-bubble.png" },
		{
			id: 13,
			name: "The Flying Dutchman",
			image: "./assets/flying-dutchman.png",
		},
		{ id: 14, name: "King Neptune", image: "./assets/king-neptune.png" },
		{ id: 15, name: "Larry", image: "./assets/larry.png" },
		{ id: 16, name: "Man Ray", image: "./assets/man-ray.png" },
		{ id: 17, name: "Keanu Reeves", image: "./assets/keanu-reeves.png" },
	];

	storedTasks: Task[] = [
		{
			id: 0,
			description: "Take food order",
			assigneeId: 2,
			completed: true,
		},
		{
			id: 1,
			description: "Clean the kitchen",
			assigneeId: 3,
			completed: false,
		},
		{
			id: 2,
			description: "Prepare food",
			assigneeId: 4,
			completed: false,
		},
		{
			id: 3,
			description: "Serve food",
			assigneeId: 5,
			completed: false,
		},
		{
			id: 4,
			description: "Clean the tables",
			assigneeId: 6,
			completed: false,
		},
		{
			id: 5,
			description: "Take payment",
			assigneeId: 7,
			completed: true,
		},
		{
			id: 6,
			description: "Clean the restaurant",
			assigneeId: 8,
			completed: false,
		},
		{
			id: 7,
			description: "Clean the bathroom",
			assigneeId: 9,
			completed: true,
		},
		{
			id: 8,
			description: "Take out the trash",
			assigneeId: 10,
			completed: true,
		},
		{
			id: 9,
			description: "Wash the dishes",
			assigneeId: 11,
			completed: false,
		},
		{
			id: 10,
			description: "Make drinks",
			assigneeId: 12,
			completed: false,
		},
	];

	lastId = 1;

	private findTaskById = (id) =>
		this.storedTasks.find((task) => task.id === +id);

	private findUserById = (id) =>
		this.storedUsers.find((user) => user.id === +id);

	tasks() {
		return of(this.storedTasks).pipe(delay(randomDelay()));
	}

	task(id: number): Observable<Task> {
		return of(this.findTaskById(id)).pipe(delay(randomDelay()));
	}

	users() {
		return of(this.storedUsers).pipe(delay(randomDelay()));
	}

	user(id: number) {
		return of(this.findUserById(id)).pipe(delay(randomDelay()));
	}

	newTask(payload: { description: string }) {
		const newTask: Task = {
			id: ++this.lastId,
			description: payload.description,
			assigneeId: null,
			completed: false,
		};

		this.storedTasks = this.storedTasks.concat(newTask);

		return of(newTask).pipe(delay(randomDelay()));
	}

	assign(taskId: number, userId: number) {
		return this.update(taskId, { assigneeId: userId });
	}

	complete(taskId: number, completed: boolean) {
		return this.update(taskId, { completed });
	}

	update(taskId: number, updates: Partial<Omit<Task, "id">>) {
		const foundTask = this.findTaskById(taskId);

		if (!foundTask) {
			return throwError(new Error("task not found"));
		}

		const updatedTask = { ...foundTask, ...updates };

		this.storedTasks = this.storedTasks.map((t) =>
			t.id === taskId ? updatedTask : t
		);

		return of(updatedTask).pipe(delay(randomDelay()));
	}
}
