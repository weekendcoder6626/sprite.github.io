import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpriteAnimationModule } from 'src/libs/sprite-animation';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SpriteAnimationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
