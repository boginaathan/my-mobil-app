import { CommonModule } from '@angular/common';
import { Component, Input, computed } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bars">
      @for (b of bars(); track $index) {
        <div class="bar-col">
          <div class="bar" [style.height.%]="b.heightPct" [style.background]="b.highlight ? highlightColor : baseColor"></div>
          <span class="bar-label">{{ b.label }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .bars {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 140px;
    }
    .bar-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
      gap: 6px;
    }
    .bar {
      width: 100%;
      max-width: 18px;
      border-radius: 6px 6px 2px 2px;
      transition: height 0.2s ease;
    }
    .bar-label {
      font-size: 10px;
      color: var(--sl-muted);
    }
  `],
})
export class BarChartComponent {
  @Input() values: number[] = [];
  @Input() labels: string[] = [];
  @Input() baseColor = '#FFE9A8';
  @Input() highlightColor = '#FFCD3C';
  @Input() highlightIndexes: number[] = [];

  bars = computed(() => {
    const max = Math.max(...this.values, 1);
    return this.values.map((v, i) => ({
      heightPct: (v / max) * 100,
      label: this.labels[i] ?? `${i}`,
      highlight: this.highlightIndexes.includes(i),
    }));
  });
}
