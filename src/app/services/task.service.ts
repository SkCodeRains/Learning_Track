import { Injectable, signal, computed } from '@angular/core';
import { TaskEntry } from '../models/task.model';
import { db } from './db';
import { liveQuery } from 'dexie';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    // Primary state: list of all tasks
    private tasksSignal = signal<TaskEntry[]>([]);

    // State for the currently selected task (for the Modal)
    private selectedTaskIdSignal = signal<string | null>(null);

    // Expose read-only signals
    public tasks = this.tasksSignal.asReadonly();

    public selectedTask = computed(() => {
        const id = this.selectedTaskIdSignal();
        return this.tasksSignal().find(t => t.id === id) || null;
    });

    // Computed statistics
    public totalHoursLearned = computed(() => {
        return this.tasksSignal().reduce((sum, task) => sum + (task.hoursLogged || 0), 0);
    });

    public tasksCompletedCount = computed(() => {
        return this.tasksSignal().filter(t => t.completions.some(c => c)).length;
    });

    public currentStreak = computed(() => {
        let streak = 0;
        const allTasks = this.tasksSignal();

        if (allTasks.length === 0) return 0;

        for (let day = 29; day >= 0; day--) {
            const anyTaskCompletedThisDay = allTasks.some(t => t.completions[day]);
            if (anyTaskCompletedThisDay) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    });

    constructor() {
        this.initDatabaseSync();
    }

    // Bind the Dexie table to our Angular Signal
    private initDatabaseSync() {
        // liveQuery observes Dexie changes
        const observable = liveQuery(() => db.tasks.toArray());
        observable.subscribe((tasks) => {
            this.tasksSignal.set(tasks);
        });
    }

    // --- Actions ---

    public async addTask(name: string, description: string = '') {
        if (!name.trim()) return;

        const newTask: TaskEntry = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            name: name.trim(),
            createdAt: new Date(),
            completions: new Array(31).fill(false),
            hoursLogged: 0,
            studyNotes: description.trim(),
            resourcesUrls: ''
        };

        try {
            await db.tasks.add(newTask);
            console.log('IndexedDB: Task successfully tracked and saved locally!');
        } catch (e) {
            console.error('IndexedDB Error: Could not save task', e);
        }
    }

    public async toggleTaskCompletion(taskId: string, dayIndex: number) {
        const task = await db.tasks.get(taskId);
        if (task) {
            const newCompletions = [...task.completions];
            newCompletions[dayIndex] = !newCompletions[dayIndex];
            await db.tasks.update(taskId, { completions: newCompletions });
        }
    }

    public selectTaskForDetails(taskId: string) {
        this.selectedTaskIdSignal.set(taskId);
    }

    public clearSelectedTask() {
        this.selectedTaskIdSignal.set(null);
    }

    public async updateTaskDetails(taskId: string, details: { hoursLogged: number, studyNotes: string, resourcesUrls: string }) {
        await db.tasks.update(taskId, details);
    }

    public async deleteTask(taskId: string) {
        await db.tasks.delete(taskId);
        // If the deleted task was currently selected in the modal, clear the selection
        if (this.selectedTaskIdSignal() === taskId) {
            this.clearSelectedTask();
        }
    }
}
