import { DurationUnits, SpriteAnimationConfig } from "src/libs/sprite-animation";

const plantAnimationConfig: SpriteAnimationConfig = {

    source: 'assets/plant-animation.png',

    originalWidth: 800,
    originalHeight: 600,

    frameRate: 24,
    firstFrame: 0,
    lastFrame: 95,

    totalDurationUnit: DurationUnits.FRAMES,
    totalDuration: 96,
};

const plantAnimationScale = 0.6;

export const plantAnimationPreset = {
    config: plantAnimationConfig,
    scale: plantAnimationScale
}

const cdAnimationConfig: SpriteAnimationConfig = {

    source: 'assets/cd-animation.png',

    originalWidth: 1920,
    originalHeight: 1080,

    frameRate: 3,
    firstFrame: 2,
    lastFrame: 12,

    totalDurationUnit: DurationUnits.FRAMES,
    totalDuration: 13,
};

const cdAnimationScale = 0.2;

export const cdAnimationPreset = {
    config: cdAnimationConfig,
    scale: cdAnimationScale
}

const jigAnimationConfig: SpriteAnimationConfig = {

    source: 'assets/jig-animation.png',

    originalWidth: 500,
    originalHeight: 750,

    frameRate: 5,
    firstFrame: 0,
    lastFrame: 25,

    totalDurationUnit: DurationUnits.FRAMES,
    totalDuration: 26,
};

const jigAnimationScale = 1;

export const jigAnimationPreset = {
    config: jigAnimationConfig,
    scale: jigAnimationScale
}

//leaf animation
//width: 600px, height: 480px, frames: 58, type: gif

const leafAnimationConfig: SpriteAnimationConfig = {

    source: 'assets/leaf-animation.png',

    originalWidth: 400,
    originalHeight: 480,

    frameRate: 15,
    firstFrame: 0,
    lastFrame: 50,

    // firstFrame: 34,
    // lastFrame: 37,

    totalDurationUnit: DurationUnits.FRAMES,
    totalDuration: 58,
};

const leafAnimationScale = 0.7;

export const leafAnimationPreset = {
    config: leafAnimationConfig,
    scale: leafAnimationScale
}

export const scrollSections = {
    topSection: 30,
    midSection: 40
}