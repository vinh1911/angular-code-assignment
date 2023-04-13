import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { SortOrder, Task, TaskFilter, User } from "./shared/interface";
import { BackendService } from "./backend.service";

export interface AppState {
	tasks: Task[];
	users: User[];
	selectedTaskId: number;
	filter: TaskFilter;
	sortOrder: SortOrder;
	query: string;
	isLoading: boolean;
	error: any;
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
	constructor(private backend: BackendService) {
		super({
			tasks: [],
			users: [],
			selectedTaskId: null,
			filter: TaskFilter.All,
			sortOrder: SortOrder.Newest,
			query: "",
			isLoading: false,
			error: null,
		});
	}

	readonly tasks$: Observable<Task[]> = this.select((state) => state.tasks);

	readonly users$: Observable<User[]> = this.select((state) => state.users);

	readonly tasksWithAssignee$: Observable<Task[]> = this.select(this.tasks$, this.users$, (tasks, users) => {
		return tasks.map((task) => {
			if (task.assigneeId && users.length > 0) {
				const assignee = users.find((user) => user.id === task.assigneeId);
				return {
					...task,
					assigneeName: assignee.name,
					assigneeImage: assignee.image,
				};
			} else {
				return task;
			}
		});
	});

	readonly selectedTaskId$: Observable<number> = this.select((state) => state.selectedTaskId);

	readonly filter$: Observable<TaskFilter> = this.select((state) => state.filter);

	readonly sortOrder$: Observable<SortOrder> = this.select((state) => state.sortOrder);

	readonly query$: Observable<string> = this.select((state) => state.query);

	readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

	readonly error$: Observable<Error> = this.select((state) => state.error);

	readonly vm$ = this.select(
		this.tasksWithAssignee$,
		this.users$,
		this.selectedTaskId$,
		this.filter$,
		this.sortOrder$,
		this.query$,
		this.isLoading$,
		this.error$,
		(tasks, users, selectedTaskId, filter, sortOrder, query, isLoading, error) => ({
			tasks: this.filterTasks(tasks, filter, query, sortOrder),
			users,
			selectedTask: selectedTaskId ? tasks.find((task) => task.id === selectedTaskId) : null,
			filter,
			sortOrder,
			query,
			isLoading,
			error,
		})
	);

	private filterTasks(tasks: Task[], filter: TaskFilter, query: string, sortOrder: SortOrder): Task[] {
		return tasks
			.filter((task) => task.description.toLowerCase().includes(query.toLowerCase()))
			.filter((task) => {
				switch (filter) {
					case TaskFilter.All:
						return true;
					case TaskFilter.Completed:
						return task.completed;
					case TaskFilter.Pending:
						return !task.completed;
				}
			})
			.sort((a, b) => {
				switch (sortOrder) {
					case SortOrder.Newest:
						return b.id - a.id;
					case SortOrder.Oldest:
						return a.id - b.id;
				}
			});
	}

	readonly selectFilter = this.updater((state, filter: TaskFilter) => ({
		...state,
		filter,
	}));

	readonly selectSortOrder = this.updater((state, sortOrder: SortOrder) => ({
		...state,
		sortOrder,
	}));

	readonly setQuery = this.updater((state, query: string) => ({
		...state,
		query,
	}));

	readonly selectTaskId = this.updater((state, taskId: number) => ({
		...state,
		selectedTaskId: taskId,
	}));

	readonly clearSelectedTaskId = this.updater((state) => ({
		...state,
		selectedTaskId: null,
	}));

	readonly loadUsers = this.effect<void>(($) =>
		$.pipe(
			tap(() => this.patchState({ isLoading: true })),
			switchMap(() => this.backend.users()),
			tapResponse(
				(users) => this.patchState({ users }),
				(error) => this.patchState({ error })
			),
			tap(() => this.patchState({ isLoading: false }))
		)
	);

	readonly loadTasks = this.effect<void>(($) =>
		$.pipe(
			tap(() => this.patchState({ isLoading: true })),
			switchMap(() => this.backend.tasks()),
			tapResponse(
				(tasks) => this.patchState({ tasks }),
				(error) => this.patchState({ error })
			),
			tap(() => this.patchState({ isLoading: false }))
		)
	);

	readonly newTask = this.effect<{ description: string; assigneeId: number }>(($) =>
		$.pipe(
			tap(() => this.patchState({ isLoading: true })),
			switchMap((payload) => this.backend.newTask(payload)),
			tapResponse(
				(task) => this.patchState({ tasks: [...this.get().tasks, task] }),
				(error) => this.patchState({ error })
			),
			tap(() => this.patchState({ isLoading: false }))
		)
	);

	readonly assignTask = this.effect<{ taskId: number; userId: number }>(($) =>
		$.pipe(
			tap(() => this.patchState({ isLoading: true })),
			switchMap((payload) => this.backend.assign(payload.taskId, payload.userId)),
			tapResponse(
				(task) => {
					this.patchState({
						tasks: this.get().tasks.map((t) => (t.id === task.id ? task : t)),
					});
				},
				(error) => this.patchState({ error })
			),
			tap(() => this.patchState({ isLoading: false }))
		)
	);

	readonly toggleCompletion = this.effect<number>(($) =>
		$.pipe(
			tap(() => this.patchState({ isLoading: true })),
			switchMap((payload) => {
				const task = this.get().tasks.find((task) => task.id === payload);
				return this.backend.complete(payload, !task.completed);
			}),
			tapResponse(
				(task) => {
					this.patchState({
						tasks: this.get().tasks.map((t) => (t.id === task.id ? task : t)),
					});
				},
				(error) => this.patchState({ error })
			),
			tap(() => this.patchState({ isLoading: false }))
		)
	);

	readonly updateTask = this.effect<{ taskId: number; description: string; assigneeId: number }>(($) =>
		$.pipe(
			tap(() => this.patchState({ isLoading: true })),
			switchMap((payload) =>
				this.backend.update(payload.taskId, {
					description: payload.description,
					assigneeId: payload.assigneeId,
				})
			),
			tapResponse(
				(task) => {
					this.patchState({
						tasks: this.get().tasks.map((t) => (t.id === task.id ? task : t)),
					});
				},
				(error) => this.patchState({ error })
			),
			tap(() => this.patchState({ isLoading: false }))
		)
	);
}
