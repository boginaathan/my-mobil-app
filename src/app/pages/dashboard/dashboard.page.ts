import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonIcon, IonAvatar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, wifi, waterOutline, thermometerOutline } from 'ionicons/icons';
import { SmartHomeService } from '../../core/smart-home.service';
import { AreaChartComponent, AreaSeries } from '../../shared/components/area-chart/area-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonAvatar, AreaChartComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  rooms = this.home.rooms;
  userName = this.home.userName;
  waterQualityScore = this.home.waterQualityScore;

  usageSeries: AreaSeries[] = [
    { values: this.home.recentUsage, color: '#FFCD3C', fill: 'rgba(255,205,60,0.35)' },
  ];
  loadPeakLine = new Array(this.home.recentUsage.length).fill(this.home.loadPeak);
  xLabels = ['0h', '1h', '2h', '3h', '4h', '5h', '6h'];

  constructor(private home: SmartHomeService, private router: Router) {
    addIcons({ add, wifi, waterOutline, thermometerOutline });
  }

  openRoom(id: string) {
    this.router.navigateByUrl('/room/' + id);
  }
}
