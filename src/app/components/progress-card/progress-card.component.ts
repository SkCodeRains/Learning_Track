import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-progress-card',
    templateUrl: './progress-card.component.html',
    styleUrl: './progress-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressCardComponent { }
