//Animation Position presets in Clockwise
export const animationPositionPresets = {

    top_left: {
        "left": "0",
        "top": "0"
    },

    top_middle: {
        "left": "50%",
        "top": "0",
        "transform": "translate(-50%, 0)"
    },

    top_right: {
        "left": "100%",
        "top": "0",
        "transform": "translate(-100%, 0)"
    },

    right_middle: {
        "left": "100%",
        "top": "50%",
        "transform": "translate(-100%, -50%)"
    },

    bottom_right: {
        "left": "100%",
        "top": "100%",
        "transform": "translate(-100%, -100%)"
    },

    bottom_middle: {
        "left": "50%",
        "top": "100%",
        "transform": "translate(-50%, -100%)"
    },

    bottom_left: {
        "left": "0",
        "top": "100%",
        "transform": "translate(0, -100%)"
    },

    left_middle: {
        "left": "0",
        "top": "50%",
        "transform": "translate(0, -50%)"
    },

    center:  {
        "left": "50%",
        "top": "50%",
        "transform": "translate(-50%, -50%)"
    },
}

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

    frameRate: number,

    totalDurationUnit: DurationUnits,
    totalDuration: number,
    
    firstFrame: number,
    lastFrame: number,
}