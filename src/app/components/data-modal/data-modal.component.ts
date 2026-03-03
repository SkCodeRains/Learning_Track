import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-data-modal',
    imports: [ReactiveFormsModule],
    templateUrl: './data-modal.component.html',
    styleUrl: './data-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataModalComponent {
    public taskService = inject(TaskService);

    public detailsForm = new FormGroup({
        hoursLogged: new FormControl(0),
        studyNotes: new FormControl(''),
        resourcesUrls: new FormControl('')
    });

    constructor() {
        // Automatically populate the form when a new task is selected
        effect(() => {
            const task = this.taskService.selectedTask();
            if (task) {
                this.detailsForm.setValue({
                    hoursLogged: task.hoursLogged || 0,
                    studyNotes: task.studyNotes || '',
                    resourcesUrls: task.resourcesUrls || ''
                });
            } else {
                this.detailsForm.reset();
            }
        });
    }

    onSave() {
        const taskId = this.taskService.selectedTask()?.id;
        if (taskId) {
            this.taskService.updateTaskDetails(taskId, {
                hoursLogged: this.detailsForm.value.hoursLogged || 0,
                studyNotes: this.detailsForm.value.studyNotes || '',
                resourcesUrls: this.detailsForm.value.resourcesUrls || ''
            });
        }
        this.taskService.clearSelectedTask();
    }

    onClose() {
        this.taskService.clearSelectedTask();
    }
}
