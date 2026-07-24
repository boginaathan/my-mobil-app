import { CommonModule } from '@angular/common';
import { Component, Input, computed } from '@angular/core';

export interface DonutSlice {
  value: number;
  color: string;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 120 120" class="donut">
      @for (seg of segments(); track $index) {
        <circle
          cx="60" cy="60" r="45"
          fill="none"
          [attr.stroke]="seg.color"
          stroke-width="18"
          [attr.stroke-dasharray]="seg.dash"
          [attr.stroke-dashoffset]="seg.offset"
          transform="rotate(-90 60 60)"
        />
      }
    </svg>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .donut { width: 100%; height: auto; display: block; }
  `],
})
export class DonutChartComponent {
  @Input() slices: DonutSlice[] = [];

  private circumference = 2 * Math.PI * 45;

  segments = computed(() => {
    const total = this.slices.reduce((sum, s) => sum + s.value, 0) || 1;
    let offsetAcc = 0;
    return this.slices.map((s) => {
      const portion = s.value / total;
      const dash = `${portion * this.circumference} ${this.circumference}`;
      const offset = -offsetAcc * this.circumference;
      offsetAcc += portion;
      return { color: s.color, dash, offset };
    });
  });
}
