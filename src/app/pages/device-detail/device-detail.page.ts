import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonIcon, IonToggle, IonRange, IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack, ellipsisHorizontal, add, sunny, sunnyOutline, createOutline, trashOutline,
} from 'ionicons/icons';
import { SmartHomeService } from '../../core/smart-home.service';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonToggle, IonRange, IonButton, BarChartComponent],
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage {
  deviceId = signal('');
  device = computed(() => this.home.getDevice(this.deviceId()));
  usageLabels = Array.from({ length: 12 }, (_, i) => `${i}`);

  constructor(private route: ActivatedRoute, private router: Router, private home: SmartHomeService) {
    addIcons({ chevronBack, ellipsisHorizontal, add, sunny, sunnyOutline, createOutline, trashOutline });
    this.deviceId.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  goBack() {
    const d = this.device();
    if (d) this.router.navigateByUrl('/room/' + d.roomId);
    else this.router.navigateByUrl('/tabs/devices');
  }

  togglePower() {
    this.home.toggleDevice(this.deviceId());
  }

  onBrightnessChange(ev: CustomEvent) {
    const value = (ev.detail as any).value as number;
    this.home.setBrightness(this.deviceId(), value);
  }
}
