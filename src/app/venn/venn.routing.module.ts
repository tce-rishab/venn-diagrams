import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagramContainerComponent } from './diagram-container/diagram-container.component';

const routes: Routes = [
  {
    path: '',
    component: DiagramContainerComponent,
  }
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VennRoutingModule {}
