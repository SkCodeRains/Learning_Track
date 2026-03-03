import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-stats-card',
    templateUrl: './stats-card.component.html',
    styleUrl: './stats-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent {
    // Use Angular 17.1+ signal inputs
    title = input.required<string>();
    value = input.required<string | number>();
    icon = input.required<string>();
    trend = input<string>(''); // e.g. "+20%"
    colorClass = input<string>('text-success'); // e.g. text-success
    bgClass = input<string>('bg-success-subtle');
}
