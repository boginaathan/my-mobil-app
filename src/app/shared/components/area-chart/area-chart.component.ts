import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';

export interface AreaSeries {
  values: number[];
  color: string; // stroke color
  fill: string; // fill color (can include opacity)
  dashed?: boolean;
}

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" preserveAspectRatio="none" class="area-chart" [style.height.px]="displayHeight">
      <g class="grid">
        @if (showGrid) {
          @for (row of gridRows(); track $index) {
            <line [attr.x1]="0" [attr.x2]="width" [attr.y1]="row" [attr.y2]="row" stroke="#EDEEF3" stroke-width="1" />
          }
        }
      </g>

      @for (s of seriesPaths(); track $index) {
        <path [attr.d]="s.areaPath" [attr.fill]="s.fill" stroke="none"></path>
        <path [attr.d]="s.linePath" fill="none" [attr.stroke]="s.color" stroke-width="3"
              stroke-linecap="round" stroke-linejoin="round"
              [attr.stroke-dasharray]="s.dashed ? '2 6' : null"></path>
      }
    </svg>
    @if (xLabels.length) {
      <div class="x-axis">
        @for (l of xLabels; track $index) {
          <span>{{ l }}</span>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .area-chart { width: 100%; display: block; }
    .x-axis {
      display: flex;
      justify-content: space-between;
      margin-top: 6px;
      font-size: 11px;
      color: var(--sl-muted);
    }
  `],
})
export class AreaChartComponent {
  @Input() series: AreaSeries[] = [];
  @Input() xLabels: string[] = [];
  @Input() maxValue?: number;
  @Input() displayHeight = 160;
  @Input() showGrid = true;

  width = 300;
  height = 160;

  private normalizedSeries = computed(() => this.series);

  gridRows = signal([0, 40, 80, 120, 160]);

  seriesPaths = computed(() => {
    const all = this.series.flatMap((s) => s.values);
    const max = this.maxValue ?? Math.max(...all, 1) * 1.15;
    return this.series.map((s) => {
      const n = s.values.length;
      const stepX = this.width / (n - 1);
      const pts = s.values.map((v, i) => {
        const x = i * stepX;
        const y = this.height - (v / max) * this.height;
        return [x, y];
      });
      const linePath = this.smoothPath(pts);
      const areaPath = `${linePath} L ${this.width} ${this.height} L 0 ${this.height} Z`;
      return { linePath, areaPath, color: s.color, fill: s.fill, dashed: s.dashed };
    });
  });

  private smoothPath(pts: number[][]): string {
    if (pts.length === 0) return '';
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const mx = (x0 + x1) / 2;
      d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  }
}
