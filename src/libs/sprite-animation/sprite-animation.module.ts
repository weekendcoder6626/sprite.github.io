import { CommonModule } from "@angular/common";
import { Input, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SpriteAnimationComponent } from "./component/sprite-animation.component";
import { AnimationState, SpriteAnimationConfig } from "./resources/sprite-animation.resources";

const declarations = [SpriteAnimationComponent];
// const imports = [];

@NgModule({
    declarations,
    imports: [
        BrowserModule,
    ],
    exports: declarations
})
export class SpriteAnimationModule { }