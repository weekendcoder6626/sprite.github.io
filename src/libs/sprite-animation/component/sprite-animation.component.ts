import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { SpriteAnimationConfig, AnimationState, DurationUnits } from "..";
import { SpriteAnimationService } from "../services/sprite-animation.service";

@Component({
    selector: 'sprite-animation',
    templateUrl: './sprite-animation.component.html',
    styleUrls: ['./sprite-animation.component.css']   
})
export class SpriteAnimationComponent implements OnInit, OnDestroy {

    /////////////////////////////
    // OUTPUT HANDLER
    /////////////////////////////

    isImplemented = true;
    
    /////////////////////////////
    // OBSERVABLES AND EMITTERS
    /////////////////////////////

    get stateChange$(): BehaviorSubject<AnimationState> {

        return this.spriteService.stateChange$;
    }

    @Output() stateChange = new EventEmitter<AnimationState>();

    @Output() currentFrameChange = new EventEmitter<number>();

    //////////////////
    // INPUTS
    /////////////////

    @Input() config!: SpriteAnimationConfig;

    @Input() scale = 1;

    @Input() loop = false;

    @Input() oscillate = false;

    //STATE 
    @Input() set state(v: AnimationState) {

        console.log("set")
        this.stateChange$.next(v);
        this.stateChange.emit(v);
    };
       
    get state(): AnimationState {

        return this.stateChange$.value;
    }

    get currentFrame(): number {

        return Math.abs(Math.floor(this.latestLeft/this.width));
    }

    @Input()
    set currentFrame(v: number) {

        this.currentFrameChange.emit(v);
        this.spriteService.frameChange$.next(v);
    }

    animationContainerStyle: Record<string, string> = {};
    animationPosition: Record<string, string> = {};

    private animation!: ReturnType<typeof setInterval>;
    
    private subs = new Subscription();
    
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

    ///////////////////////
    // READONLY PROPERTIES
    ///////////////////////

    //SOURCE URL
    get src(): string {

        return this.config.source;
    }

    //SCALED DIMENSIONS OF A SINGLE SPRITE
    get height() : number {

        return this.config.originalHeight * this.scale;
    }
    get width() : number {

        return this.config.originalWidth * this.scale;
    }

    //SCALED DIMENSIONS OF TOTAL SPRITESHEET
    get totalWidth(): number {

        return this.width * this.totalFrames;
    }

    get totalHeight(): number {

        return this.height * 1;
    }

    //FRAME PROPERTIES
    get totalFrames(): number {

        return (this.config.totalDurationUnit === DurationUnits.FRAMES) ? this.config.totalDuration : this.config.totalDuration * this.config.frameRate;
    }
    get frameInterval(): number {

        return 1000/this.config.frameRate;
    }

    //BOUNDARY CONDITIONS

    //INITIAL BOUNDARY
    get initLeft(): number {
        return -(this.config.firstFrame * this.width);
    }

    get initTop(): number {
        return 0;
    }

    //FINAL BOUNDARY
    get lastLeft(): number {
        return -(this.totalWidth - (this.totalFrames - this.config.lastFrame) * this.width);
    }

    get lastTop(): number {
        return 0;
    }

    constructor(private spriteService: SpriteAnimationService) {}

    //////////////
    // HOOKS
    //////////////

    ngOnInit() {

        this.spriteService.frameChange$.next(this.config.firstFrame);

        this.initializeStyles();

        this.isImplemented = !(this.config.totalDurationUnit === DurationUnits.SECONDS);

        ///////////////////////
        // SUBSCRIPTIONS
        ///////////////////////

        const subs1 = this.stateChange$.subscribe(v => {
            this.playAnimation(v);
        });

        this.subs.add(subs1);
    }

    
    ngOnDestroy() {

        this.subs.unsubscribe();
    }

    ///////////////////////
    // INITIALIZE NGSTYLE
    ///////////////////////

    initializeStyles() {

        this.initializeContainerStyle();
    }

    initializeContainerStyle() {
        this.animationContainerStyle = {

            'height': `${this.height}px`,

            'width': `${this.width}px`,

        }
    }

    /////////////////////
    // ANIMATION
    ////////////////////

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

    ////////////////////////////
    // ANIMATION STATE HANDLERS
    ////////////////////////////

    //FORWARD
    playAnimationForward() {

        //If it is at the last position
        //send it to the starting position
        if(this.latestLeft === this.lastLeft) this.latestLeft = this.initLeft;

        //stopping already running 
        //animations
        this.stopAnimation();

        console.log("Forward Frame: ", this.currentFrame);
        
        //Creating animation
        this.animation = setInterval(() => {
            
            //update position
            this.latestLeft -= this.width;

            //update frame
            this.currentFrame = this.currentFrame;

            console.log("Forward Frame: ", this.currentFrame);
     
            //stop animation if
            //the last sprite is reached
            if(this.latestLeft === this.lastLeft) {

                console.log("end forward")

                if(this.loop) {
        
                    if(this.oscillate) {
                     
                        this.playAnimationBackward();

                    } else {

                        this.latestLeft = this.initLeft;
                    }

                } else {

                    this.state = AnimationState.PAUSE;

                    this.stopAnimation()
                }
            }
        }, this.frameInterval);
    } 

    //PAUSE
    stopAnimation() {

        if(this.animation)clearInterval(this.animation);
    }

    //BACKWARD
    playAnimationBackward() {

    //If it is at the starting position
    //send it to the last position
    if (this.latestLeft === this.initLeft) this.latestLeft = this.lastLeft;

    //stop already running 
    //animations
    this.stopAnimation();

    console.log("Backward Frame: ", this.currentFrame);

    //setting the animation
    this.animation = setInterval(() => {

        //update the current postion
        this.latestLeft += this.width;

        //update frame
        this.currentFrame = this.currentFrame;

        console.log("Backward Frame: ", this.currentFrame);

        //stop animation if it 
        //reaches the beginning
        if(this.latestLeft === this.initLeft) {
            if(this.loop) {

                if(this.oscillate) {

                    this.playAnimationForward();

                } else {

                    this.latestLeft = this.lastLeft;
                }

            } else {

                this.state = AnimationState.PAUSE;
                this.stopAnimation()
            }
        }
    }, this.frameInterval);
} 
}