import Dexie, { Table } from 'dexie';
import { TaskEntry } from '../models/task.model';

export class AppDB extends Dexie {
    tasks!: Table<TaskEntry, string>;

    constructor() {
        super('LearningTrackDB');
        this.version(1).stores({
            tasks: 'id, name, createdAt' // Primary key and indexed props
        });
    }
}

export const db = new AppDB();
