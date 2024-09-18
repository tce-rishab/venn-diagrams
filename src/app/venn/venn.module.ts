import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightHandContainerComponent } from './right-hand-container/right-hand-container.component';
import { LeftHandContainerComponent } from './left-hand-container/left-hand-container.component';
import { DiagramContainerComponent } from './diagram-container/diagram-container.component';
import { VennRoutingModule } from './venn.routing.module';
import { VennMaterialModule } from './venn-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    RightHandContainerComponent,
    LeftHandContainerComponent,
    DiagramContainerComponent,
    
  ],
  imports: [
    CommonModule,
    VennRoutingModule,
    VennMaterialModule,
    FlexLayoutModule
    
  ]
  
})
export class VennModule { }
