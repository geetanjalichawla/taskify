

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

export interface IInputTask {
    title: string;
    description?: string;
    due_date: Date;
    priority: Priority;
    status?: Status;
}


export interface ITask extends IInputTask {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}