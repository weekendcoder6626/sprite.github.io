import { Component } from '@angular/core';
import { AnimationState, DurationUnits, SpriteAnimationConfig } from 'src/libs/sprite-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprite-animation';

  animationConfig: SpriteAnimationConfig = {

    source: 'assets/plant-animation.png',

    originalWidth: 800,
    originalHeight: 600,

    scaleFactor: 1,

    frameRate: 24,
    firstFrame: 0,
    lastFrame: 95,

    totalDurationUnit: DurationUnits.FRAMES,
    totalDuration: 96,
  };

  animationSwitchState = 1;

  get animationState(): AnimationState {
    switch(this.animationSwitchState) {
      case 0: {

        return AnimationState.FORWARD;
      }

      case 1: {

        return AnimationState.PAUSE;
      }

      case 2: {

        return AnimationState.BACKWARD
      }

      default: {

        return AnimationState.PAUSE
      }
    }
  }  

  forwardState() {
    this.animationSwitchState = 0;
  }

  pauseState() {
    this.animationSwitchState = 1;
  }

  backwardState() {
    this.animationSwitchState = 2;
  }
}
