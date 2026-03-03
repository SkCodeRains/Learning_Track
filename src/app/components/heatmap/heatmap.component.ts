import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-heatmap',
    imports: [CommonModule],
    templateUrl: './heatmap.component.html',
    styleUrl: './heatmap.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatmapComponent { }
