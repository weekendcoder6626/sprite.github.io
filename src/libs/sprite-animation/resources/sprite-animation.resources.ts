export enum DurationUnits {
    FRAMES="frames", SECONDS="seconds"
}

export enum AnimationState {
    FORWARD="forward", BACKWARD="backward", PAUSE="pause"
}

export interface SpriteAnimationConfig {

    source: string,

    originalWidth: number,
    originalHeight: number,

    scaleFactor: number,

    frameRate: number,

    totalDurationUnit: DurationUnits,
    totalDuration: number,
    
    firstFrame: number,
    lastFrame: number,
}