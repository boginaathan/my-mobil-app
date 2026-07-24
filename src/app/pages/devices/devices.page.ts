import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonIcon, IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add, ellipsisHorizontal, videocam, restaurant, gameController, bulb, wifi, logoApple, snow,
} from 'ionicons/icons';
import { SmartHomeService } from '../../core/smart-home.service';
import { AreaChartComponent, AreaSeries } from '../../shared/components/area-chart/area-chart.component';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton, AreaChartComponent],
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage {
  devices = this.home.devices;

  sparkline(values: number[]): AreaSeries[] {
    return [{ values, color: '#6C6FF0', fill: 'rgba(108,111,240,0.15)' }];
  }

  constructor(private home: SmartHomeService, private router: Router) {
    addIcons({ add, ellipsisHorizontal, videocam, restaurant, gameController, bulb, wifi, logoApple, snow });
  }

  openDevice(id: string) {
    this.router.navigateByUrl('/device/' + id);
  }
}
