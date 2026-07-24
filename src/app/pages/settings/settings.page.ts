import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, notificationsOutline, wifiOutline, shieldCheckmarkOutline,
  helpCircleOutline, logOutOutline, chevronForward,
} from 'ionicons/icons';
import { SmartHomeService } from '../../core/smart-home.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonAvatar],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  userName = this.home.userName;

  items = [
    { icon: 'person-outline', label: 'Account' },
    { icon: 'notifications-outline', label: 'Notifications' },
    { icon: 'wifi-outline', label: 'Network' },
    { icon: 'shield-checkmark-outline', label: 'Security' },
    { icon: 'help-circle-outline', label: 'Help & support' },
  ];

  constructor(private home: SmartHomeService, private router: Router) {
    addIcons({
      personOutline, notificationsOutline, wifiOutline, shieldCheckmarkOutline,
      helpCircleOutline, logOutOutline, chevronForward,
    });
  }

  logOut() {
    this.router.navigateByUrl('/login');
  }
}
