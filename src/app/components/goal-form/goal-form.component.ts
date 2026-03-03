import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-goal-form',
    templateUrl: './goal-form.component.html',
    styleUrl: './goal-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalFormComponent {
    private taskService = inject(TaskService);

    // Using pure Signal forms as requested
    public taskName = signal('');
    public description = signal('');

    updateTaskName(event: Event) {
        this.taskName.set((event.target as HTMLInputElement).value);
    }

    updateDescription(event: Event) {
        this.description.set((event.target as HTMLTextAreaElement).value);
    }

    onSubmit(event: Event) {
        // Explicitly prevent browser form submission (which causes the reload)
        event.preventDefault();

        const name = this.taskName();
        const desc = this.description();

        if (name && name.trim()) {
            this.taskService.addTask(name, desc).then(() => {
                this.taskName.set('');
                this.description.set('');
            });
        }
    }
}
