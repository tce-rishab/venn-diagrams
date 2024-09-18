import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  exports: [
    FlexLayoutModule,
    DragDropModule
   
  ],
})
export class VennMaterialModule {}
