import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, Observable, Subject, Subscription } from "rxjs";
import { SpriteAnimationConfig, AnimationState, DurationUnits } from "..";

@Component({
    selector: 'sprite-animation',
    templateUrl: './sprite-animation.component.html',
    styleUrls: ['./sprite-animation.component.css']   
})
export class SpriteAnimationComponent implements AfterViewInit, OnDestroy {
    @Input() config!: SpriteAnimationConfig;

    @Input() set state(v: AnimationState) {
        this.stateChanges.next(v);
    };

    get state(): AnimationState {
        return this.stateChanges.value;
    }

    stateChanges = new BehaviorSubject<AnimationState>(AnimationState.PAUSE);

    private animation!: ReturnType<typeof setInterval>;
    
    
    private _latestLeft!: number;

    get latestLeft() : number {
        return this._latestLeft || this.initLeft;
    }

    set latestLeft(v : number) {
        this._latestLeft = v;
    }
    
    private _latestTop!: number;

    get latestTop() : number {
        return this._latestTop || this.initTop;
    }

    set latestTop(v : number) {
        this._latestTop = v;
    }
    

    private subs = new Subscription();

    get src(): string {
        return this.config.source;
    }

    get height() : number {
        return this.config.originalHeight * this.config.scaleFactor;
    }

    get width() : number {
        return this.config.originalWidth * this.config.scaleFactor;
    }

    get totalFrames(): number {
        return (this.config.totalDurationUnit === DurationUnits.FRAMES) ? this.config.totalDuration : this.config.totalDuration * this.config.frameRate;
    }

    get totalWidth(): number {
        return this.width * this.totalFrames;
    }

    get totalHeight(): number {
        return this.height * 1;
    }

    get lastLeft(): number {
        return -(this.totalWidth - (this.totalFrames - this.config.lastFrame) * this.width);
    }

    get lastTop(): number {
        return 0;
    }

    get initLeft(): number {
        return -(this.config.firstFrame * this.width);
    }

    get initTop(): number {
        return 0;
    }

    get frameInterval(): number {
        return 1000/this.config.frameRate;
    }

    animationContainerStyle: Record<string, string> = {};

    ngAfterViewInit() {
        this.animationContainerStyle = {
            'height': `${this.height}px`,
            'width': `${this.width}px`,
            'border': `solid`
        }

        const subs1 = this.stateChanges.pipe(
            distinctUntilChanged()
        ).subscribe(v => {
            this.playAnimation(v);
        });

        this.subs.add(subs1);
    }
    
    ngOnDestroy() {

        this.subs.unsubscribe();
    }

    playAnimation(state: AnimationState) {

        switch(state) {
            case AnimationState.FORWARD: {

                this.playAnimationForward();
                break;
            }
            
            case AnimationState.PAUSE: {

                this.stopAnimation();
                break;
            }

            case AnimationState.BACKWARD: {

                this.playAnimationBackward();
                break;
            }

        }
    }

    playAnimationForward() {

        //initialising latest positions in the first iteration
        if(this.latestLeft === this.lastLeft) this.latestLeft = this.initLeft;
    
        //stopping already running animations
        this.stopAnimation();
    
        //Creating animation
        this.animation = setInterval(() => {
            
            //update position
            this.latestLeft -= this.width;
     
            //stop animation if
            //the last sprite is reached
            if(this.latestLeft === this.lastLeft) {
                this.state = AnimationState.PAUSE;
                this.stopAnimation()
            }
        }, this.frameInterval);
    } 

    stopAnimation() {
        if(this.animation)clearInterval(this.animation);
    }

    ///play the animation right to left
    playAnimationBackward() {
    
    //if the animation didn't begin yet
    //or if it is at the starting position
    //abort this function
    if(this.latestLeft === this.initLeft) return;

    //stop already running 
    //animations
    this.stopAnimation();

    //setting the animation
    this.animation = setInterval(() => {

        //update the current postion
        this.latestLeft += this.width;

        //stop animation if it 
        //reaches the beginning
        if(this.latestLeft === this.initLeft) {
            this.state = AnimationState.PAUSE;
            this.stopAnimation()
        }
    }, this.frameInterval);
} 
}