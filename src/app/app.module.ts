import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftHandDiagramComponent } from './left-hand-diagram/left-hand-diagram.component';
import { VennModule } from './venn/venn.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LeftHandDiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // DragDropModule
    VennModule,
    BrowserAnimationsModule,
    // FlexLayoutModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
