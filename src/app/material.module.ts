import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSliderModule } from '@angular/material/slider'
import {MatTooltipModule} from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout'

const modules = [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSliderModule,
    MatTooltipModule,

    FlexLayoutModule
]

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }