import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})


export class TimerComponent implements OnInit, OnDestroy {
  clock: any;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  laps: any = [];
  counter: number;
  timerRef;
  running: boolean = false;
  startText = 'Start';
  removeText = 'Remove';
  filledTheLapArray = false;

  @Input() start: boolean;
  @Input() showTimerControls: boolean;

  constructor() {
  }
  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    }
    else{
      this.clearTimer();
    }
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }
  lapTimeSplit() {
    if (this.resetFilled()) {
      return;
    }
    let lapTime = this.minutes + ':' + this.seconds + '.' + this.milliseconds;
    const foundIndex = (element) => element === lapTime ;
    if (this.laps.findIndex(foundIndex) === -1){
      this.laps.push(lapTime);
      this.resetFilled();
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Play';
    this.counter = undefined;
    this.milliseconds = '00',
      this.seconds = '00',
      this.minutes = '00';
    this.laps = [];
    clearInterval(this.timerRef);
    this.resetFilled();
  }
  resetFilled(){
    this.laps.length >= 10 ? this.filledTheLapArray = true : this.filledTheLapArray = false;
    return this.filledTheLapArray;
  }
  removeLap(i){
    this.laps.splice(i, 1);
    this.resetFilled();
  }
}