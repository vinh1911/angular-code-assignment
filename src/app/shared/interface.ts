export interface User {
	id: number;
	name: string;
	image: string;
}

export interface Task {
	id: number;
	description: string;
	completed: boolean;
	assigneeId?: number;
	assigneeName?: string;
	assigneeImage?: string;
}

export enum TaskFilter {
	All,
	Completed,
	Pending
}

export enum SortOrder {
	Newest,
	Oldest
}
