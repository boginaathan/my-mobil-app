import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonIcon, IonInput, IonItem, IonLabel, IonButton, IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoApple, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonButton, IonText],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = 'john.doe@corp.com';
  password = 'secret';

  constructor(private router: Router) {
    addIcons({ logoApple, logoGoogle });
  }

  signIn() {
    this.router.navigateByUrl('/tabs/dashboard');
  }

  signUp() {
    // Placeholder for sign-up flow
  }
}
