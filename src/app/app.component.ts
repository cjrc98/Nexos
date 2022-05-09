import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    await this.platform.ready();
  this.platform.backButton.subscribeWithPriority(1, () =>{

  });
    this.platform.ready().then(() => {
      this.router.navigate(['home']); 
    });
  }
}
