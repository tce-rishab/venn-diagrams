import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-left-hand-container',
  templateUrl: './left-hand-container.component.html',
  styleUrls: ['./left-hand-container.component.scss']
})
export class LeftHandContainerComponent implements OnInit {
  private p5: any;
  categories = ['A', 'B', 'C'];
  items = [
    { name: 'Item 1', category: 'A' },
    { name: 'Item 2', category: 'B' },
    { name: 'Item 3', category: 'C' },
    { name: 'Item 4', category: 'A' },
    { name: 'Item 5', category: 'B' },
    { name: 'Item 6', category: 'C' },
  ];



  // items = [
  //   { col1: 'Item 1 Text', col2: 'Item 1 Text', col3: 'Item 1 Text' },
  //   { col1: 'Item 2 Text', col2: 'Item 2 Image', col3: 'Item 2 Text' },
  //   { col1: 'Item 3 Text', col2: 'Item 3 Image', col3: 'Item 3 Text' }
  // ];
  // items = [
  //   { col1: 'Item 1 Text', col2: 'Item 1 Text', col3: 'Item 1 Text' },
  //   { col1: 'Item 2 Text', col2: 'Item 2 Image', col3: 'Item 2 Text' },
  //   { col1: 'Item 3 Text', col2: 'Item 3 Image', col3: 'Item 3 Text' }
  // ];

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
      // Bind 'dragover' event to allow drop
      canvas.elt.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault(); // Necessary to allow dropping
      });

      // Bind 'drop' event to handle dropping
      canvas.elt.addEventListener('drop', (event: DragEvent) => {
        this.onDrop(event);
      });
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
      p.text(this.categories[0], 100, 180);
      p.text(this.categories[1], 300, 180);
      p.text(this.categories[2], 180, 190);
    };
  }

  // Handle drop event
  onDrop(event: DragEvent): void {
    
    event.preventDefault();
    
    const data = event.dataTransfer?.getData('text');
    if (data) {
      const item = JSON.parse(data);
      console.log('dropped', item)
      // Get the position where the item was dropped
      const x = event.offsetX;
      const y = event.offsetY;

      // Check if the dropped position is in circle A or B
      const inCircleA = this.isInsideCircle(x, y, 150, 200, 100); // Circle A
      const inCircleB = this.isInsideCircle(x, y, 250, 200, 100); // Circle B
     
      if (item.category === this.categories[0] && inCircleA && !inCircleB ) {
        alert(`Item ${item.name} dropped in correct area A!`);
      } else if (item.category === this.categories[1] && inCircleB && !inCircleA) {
        alert(`Item ${item.name} dropped in correct area B!`);
      } else if (item.category === this.categories[2] && inCircleA && inCircleB) {
        alert(`Item ${item.name} dropped in correct intersection area C!`);
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

  // Method to handle drag and drop
  drop(event: CdkDragDrop<string[]>) {
    console.log('drop', event)
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    this.p5.remove();
  }
}
