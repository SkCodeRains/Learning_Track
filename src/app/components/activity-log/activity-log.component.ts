import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-activity-log',
    templateUrl: './activity-log.component.html',
    styleUrl: './activity-log.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityLogComponent { }
