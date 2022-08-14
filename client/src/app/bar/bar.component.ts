import { Component, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor(private _location: Location) { }

  rxTime = new Date();
  intervalId: any;
  subscription: Subscription | undefined;

  ngOnInit() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  backClicked() {
    this._location.back();
  }
}
