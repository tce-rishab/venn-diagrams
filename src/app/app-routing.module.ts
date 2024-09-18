import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagramContainerComponent } from './venn/diagram-container/diagram-container.component';

const routes: Routes = [
  {path: '',
  redirectTo: 'venn-diagram',
pathMatch: 'full'},
  
  {
    path: 'venn-diagram',
    loadChildren: () => import('./venn/venn.module').then(m => m.VennModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
