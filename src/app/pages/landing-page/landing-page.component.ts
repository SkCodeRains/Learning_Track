import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivityLogComponent } from '../../components/activity-log/activity-log.component';
import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { DataModalComponent } from '../../components/data-modal/data-modal.component';
import { GoalFormComponent } from '../../components/goal-form/goal-form.component';
import { ProgressCardComponent } from '../../components/progress-card/progress-card.component';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { HeatmapComponent } from '../../components/heatmap/heatmap.component';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-landing-page',
    imports: [
        HeaderComponent,
        ActivityLogComponent,
        TaskTableComponent,
        DataModalComponent,
        GoalFormComponent,
        ProgressCardComponent,
        StatsCardComponent,
        HeatmapComponent
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
    public taskService = inject(TaskService);
}
