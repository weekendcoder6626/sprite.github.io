import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AnimationState } from "..";

@Injectable({
    providedIn: "root"
})
export class SpriteAnimationService {

    ///////////////
    // OBSERVABLES
    ///////////////

    stateChange$ = new BehaviorSubject<AnimationState>(AnimationState.PAUSE);
    frameChange$ = new BehaviorSubject<number>(0);
}