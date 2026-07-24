import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonIcon, IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, add, ellipsisHorizontal, wifi, thermometerOutline, waterOutline } from 'ionicons/icons';
import { SmartHomeService } from '../../core/smart-home.service';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonToggle, BarChartComponent],
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage {
  roomId = signal<string>('');
  room = computed(() => this.home.getRoom(this.roomId()));
  devices = computed(() => this.home.getDevicesForRoom(this.roomId()));

  usageValues = [28, 5, 20, 22, 22, 20, 12, 8, 20, 10, 22, 20];
  usageLabels = Array.from({ length: 12 }, (_, i) => `${i}`);

  constructor(private route: ActivatedRoute, private router: Router, private home: SmartHomeService) {
    addIcons({ chevronBack, add, ellipsisHorizontal, wifi, thermometerOutline, waterOutline });
    this.roomId.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  goBack() {
    this.router.navigateByUrl('/tabs/dashboard');
  }

  openDevice(id: string) {
    this.router.navigateByUrl('/device/' + id);
  }

  toggle(id: string, event: Event) {
    event.stopPropagation();
    this.home.toggleDevice(id);
  }
}
