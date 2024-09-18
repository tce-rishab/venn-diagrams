import { Component, ElementRef, OnInit } from '@angular/core';
import * as p5 from 'p5';


@Component({
  selector: 'app-left-hand-diagram',
  templateUrl: './left-hand-diagram.component.html',
  styleUrls: ['./left-hand-diagram.component.scss']
})
export class LeftHandDiagramComponent implements OnInit {
  
  private p5: any;

  items = [
    { name: 'Item 1', category: 'A' },
    { name: 'Item 2', category: 'B' },
    { name: 'Item 3', category: 'A∩B' }
  ];

  draggedItem: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createCanvas();
  }

  onDragStart(event: DragEvent, item: any): void {
    this.draggedItem = item;
    event.dataTransfer?.setData('text', JSON.stringify(item));
  }

  createCanvas(): void {
    this.p5 = new p5(this.sketch.bind(this), this.elementRef.nativeElement.querySelector('#venn-diagram-container'));
  }

  sketch(p: any): void {
    let canvas: any;
    
    p.setup = () => {
      canvas = p.createCanvas(400, 400);
      canvas.drop(this.onDrop.bind(this)); // Bind drop event
    };

    p.draw = () => {
      p.background(255);
      
      // Draw circles for sets A and B
      p.fill(255, 0, 0, 150);
      p.ellipse(150, 200, 200, 200); // A

      p.fill(0, 0, 255, 150);
      p.ellipse(250, 200, 200, 200); // B

      // Add labels
      p.fill(0);
      p.textSize(16);
      p.text('A', 100, 180);
      p.text('B', 300, 180);
    };
  }

  // Handle drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    
    const data = event.dataTransfer?.getData('text');
    if (data) {
      const item = JSON.parse(data);

      // Get the position where the item was dropped
      const x = event.offsetX;
      const y = event.offsetY;

      // Check if the dropped position is in circle A or B
      const inCircleA = this.isInsideCircle(x, y, 150, 200, 100); // Circle A
      const inCircleB = this.isInsideCircle(x, y, 250, 200, 100); // Circle B

      if (item.category === 'A' && inCircleA) {
        alert(`Item ${item.name} dropped in correct area A!`);
      } else if (item.category === 'B' && inCircleB) {
        alert(`Item ${item.name} dropped in correct area B!`);
      } else if (item.category === 'A∩B' && inCircleA && inCircleB) {
        alert(`Item ${item.name} dropped in correct intersection area A∩B!`);
      } else {
        alert(`Item ${item.name} dropped in wrong area.`);
      }
    }
  }

  // Helper function to check if a point is inside a circle
  isInsideCircle(x: number, y: number, cx: number, cy: number, r: number): boolean {
    const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    return distance <= r;
  }

  ngOnDestroy(): void {
    this.p5.remove();
  }
}
