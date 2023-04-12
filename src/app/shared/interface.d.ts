export interface User {
	id: number;
	name: string;
	image: string;
}

export interface Task {
	id: number;
	description: string;
	assigneeId?: number;
	completed: boolean;
}
