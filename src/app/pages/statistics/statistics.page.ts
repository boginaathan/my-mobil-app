import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trendingUp, chevronForward } from 'ionicons/icons';
import { SmartHomeService } from '../../core/smart-home.service';
import { AreaChartComponent, AreaSeries } from '../../shared/components/area-chart/area-chart.component';
import { DonutChartComponent, DonutSlice } from '../../shared/components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon, AreaChartComponent, DonutChartComponent],
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {
  range = signal<'day' | 'week' | 'month' | 'year'>('day');

  forecastCost = this.home.forecastCost;
  currentCost = this.home.currentCost;
  todayConsumedPercent = this.home.todayConsumedPercent;
  todayConsumedValue = this.home.todayConsumedValue;
  todayTotalValue = this.home.todayTotalValue;

  expenseSeries: AreaSeries[] = [
    { values: this.home.expensesDay, color: '#6C6FF0', fill: 'rgba(108,111,240,0.35)' },
    { values: this.home.electricityDay, color: '#FFCD3C', fill: 'rgba(255,205,60,0.35)' },
  ];
  xLabels = ['0h', '1h', '2h', '3h', '4h', '5h', '6h'];

  shareSlices: DonutSlice[] = [
    { value: this.home.sharesWater, color: '#6C6FF0' },
    { value: this.home.sharesElectricity, color: '#FFCD3C' },
  ];

  // Gauge: 270 degree arc from -225deg to 45deg (bottom-left to bottom-right over the top)
  private gaugeStartAngle = -225;
  private gaugeEndAngle = 45;

  gaugeBackgroundPath = this.describeArc(60, 60, 45, this.gaugeStartAngle, this.gaugeEndAngle);
  gaugeValuePath = this.describeArc(
    60, 60, 45,
    this.gaugeStartAngle,
    this.gaugeStartAngle + (this.todayConsumedPercent / 100) * (this.gaugeEndAngle - this.gaugeStartAngle)
  );

  constructor(private home: SmartHomeService) {
    addIcons({ trendingUp, chevronForward });
  }

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
  }

  private describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(cx, cy, r, endAngle);
    const end = this.polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  }

  setRange(r: 'day' | 'week' | 'month' | 'year') {
    this.range.set(r);
  }
}
