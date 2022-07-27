import { AfterViewInit, ChangeDetectorRef, Component, Type } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { debounceTime, fromEvent, Observable } from 'rxjs';
import { animationPositionPresets, AnimationState, SpriteAnimationConfig } from 'src/libs/sprite-animation';
import { cdAnimationPreset, jigAnimationPreset, leafAnimationPreset, plantAnimationPreset, scrollSections } from './resources/animation-configs';
import { ScrollSection } from './resources/app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Sprite Animation';

  loop = true;

  ch: number;

  animationPreset = cdAnimationPreset;

  animationState = AnimationState.PAUSE;

  currentFrame!: number;

  get animationConfig(): SpriteAnimationConfig {

    return this.animationPreset.config;
  }

  get animationScale(): number {

    return this.animationPreset.scale;
  }

  get firstFrame(): number {

    return this.animationConfig.firstFrame;
  }

  set firstFrame(v: number) {

    this.animationConfig.firstFrame = v;
  }

  get lastFrame(): number {

    return this.animationConfig.lastFrame;
  }

  set lastFrame(v: number) {

    this.animationConfig.lastFrame = v;
  }

  get positionStyle(): Record<string, string> {
    
    return animationPositionPresets.center;
  }

  constructor() {
    this.currentFrame = this.firstFrame;
    this.ch = document.scrollingElement?.getBoundingClientRect().top || 10;
  }

  ngAfterViewInit() {

    const event = fromEvent(document, 'scroll');

    event.subscribe((e: Event) => {

      this.scrollSectionOperations(e);

    })
  }

  scrollSectionOperations(e: Event) {
    const doc = (e.target as Document)

    const scrollTop = doc.scrollingElement!.scrollTop;
    const clientHeight = doc.scrollingElement!.clientHeight;
    const scrollHeight = doc.scrollingElement!.scrollHeight;

    const topSection: ScrollSection = {
      
      lowerLimit: 0,

      upperLimit: scrollHeight * scrollSections.topSection / 100

    }

    const midSection: ScrollSection = {

      lowerLimit: topSection.upperLimit,

      upperLimit: topSection.upperLimit + scrollHeight * scrollSections.midSection / 100

    }

    const bottomSection: ScrollSection = {
      
      lowerLimit: midSection.upperLimit,

      upperLimit: scrollHeight

    }

    if (this.isTopSection(scrollTop, scrollHeight, clientHeight, topSection)) console.log("Top Section");

    else if (this.isMidSection(scrollTop, scrollHeight, clientHeight, midSection)) console.log("Mid Section");

    else console.log("bottom section")

  } 

  isTopSection(scrollTop: number, scrollHeight: number, clientHeight: number, topSection: ScrollSection): boolean {

    if(scrollTop === 0) return true;

    if(Math.floor(scrollTop + clientHeight * scrollSections.topSection / 100) < topSection.upperLimit) return true;

    return false;
  }

  isMidSection(scrollTop: number, scrollHeight: number, clientHeight: number, midSection: ScrollSection): boolean {


    if(Math.floor(scrollTop + clientHeight * scrollSections.topSection / 100) === midSection.lowerLimit) return true;

    if(Math.floor(scrollTop + clientHeight * (scrollSections.topSection + scrollSections.midSection) / 100) < midSection.upperLimit) return true;

    return false;
  }

  
  changeFirstFrame(event: MatSliderChange) {

    this.firstFrame = event.value!;
  }

  formatLabel(value: number) {

    return value;
  }

  forwardState() {
    this.animationState = AnimationState.FORWARD;
  }

  pauseState() {
    this.animationState = AnimationState.PAUSE;
  }

  backwardState() {
    this.animationState = AnimationState.BACKWARD;
  }
}
