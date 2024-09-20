import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'venn-diagrams';

  getCoordinates(event: MouseEvent) {
    console.log('coordinates', event.clientX, event.clientY)
   
  }
}
