import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  exports: [
    FlexLayoutModule,
    DragDropModule,
    MatDialogModule
   
  ],
})
export class VennMaterialModule {}
