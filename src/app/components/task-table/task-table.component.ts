import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-table',
    imports: [CommonModule],
    templateUrl: './task-table.component.html',
    styleUrl: './task-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTableComponent {
    public taskService = inject(TaskService);

    // Dynamic generation based on actual month lengths
    public days: number[] = [];
    public currentDay: number;

    public taskToDelete: string | null = null;

    constructor() {
        const today = new Date();
        this.currentDay = today.getDate();

        // Calculate amount of days in the current month
        const thisMonth = today.getMonth();
        const thisYear = today.getFullYear();
        const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();

        this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }

    toggleDay(taskId: string, dayIndex: number) {
        this.taskService.toggleTaskCompletion(taskId, dayIndex);
    }

    openDetails(taskId: string) {
        this.taskService.selectTaskForDetails(taskId);
    }

    confirmDelete(taskId: string) {
        this.taskToDelete = taskId;
    }

    executeDelete() {
        if (this.taskToDelete) {
            this.taskService.deleteTask(this.taskToDelete);
            this.taskToDelete = null;
        }
    }
}
