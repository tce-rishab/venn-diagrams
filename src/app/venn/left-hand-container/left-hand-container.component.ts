import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as p5 from 'p5';
import { ResetDialogComponent } from '../reset-dialog/reset-dialog.component';


export interface VennDiagramI {
  name: string, 
  category: string, 
  src: string
}
@Component({
  selector: 'app-left-hand-container',
  templateUrl: './left-hand-container.component.html',
  styleUrls: ['./left-hand-container.component.scss']
})
export class LeftHandContainerComponent implements OnInit {
  private p5: any;

  shuffledItems: any[] = [];
  resetItems: Array<VennDiagramI> = [];
  // categories = ['A', 'B', 'C'];
 
  // items:Array <VennDiagramI> = [
  //   { name: 'Item 1', category: 'A' },
  //   { name: 'Item 2', category: 'B' },
  //   { name: 'Item 3', category: 'C' },
  //   { name: 'Item 4', category: 'A' },
  //   { name: 'Item 5', category: 'B' },
  //   { name: 'Item 6', category: 'C' },
  // ];

  categories = ['Herbivore', 'Carnivore', 'Omnivore'];
  items:Array <VennDiagramI> = [
    { name: 'Cow', category: 'Herbivore', src: '/assets/images/cow.svg' },
    { name: 'Lion', category: 'Carnivore', src: '/assets/images/lion.svg' },
    { name: 'Dog', category: 'Omnivore', src: '/assets/images/dog.svg' },
    { name: 'Deer', category: 'Herbivore', src: '/assets/images/deer.svg' },
    { name: 'Badger', category: 'Omnivore', src: '/assets/images/badger.svg' },
    { name: 'Giraffe', category: 'Herbivore', src: '/assets/images/giraffe.svg' },
    { name: 'Polar Bear', category: 'Carnivore', src: '/assets/images/polar-bear.svg' },
    { name: 'dolphin', category: 'Carnivore', src: '/assets/images/dolphin.svg' },
    { name: 'Rhinoceros', category: 'Herbivore', src: '/assets/images/rhinoceros.svg' },
  ];

  dropIntoList:Array <VennDiagramI> = [];



  // items = [
  //   { col1: 'Item 1 Text', col2: 'Item 1 Text', col3: 'Item 1 Text' },
  //   { col1: 'Item 2 Text', col2: 'Item 2 Image', col3: 'Item 2 Text' },
  //   { col1: 'Item 3 Text', col2: 'Item 3 Image', col3: 'Item 3 Text' }
  // ];

  
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Method to reset and shuffle the grid items
  resetGrid() {
    if(this.items?.length)
    this.shuffledItems = this.shuffleArray(this.items); // Shuffle a copy of the items array
  else 
  this.shuffledItems = this.shuffleArray(this.resetItems); 
  }

  drop2(event: CdkDragDrop<Array<VennDiagramI>>) {
    if (this.validateDropPoint(event)) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
            const index = this.items?.findIndex(item => item?.name === this.draggedItem?.name);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          index,               //calculate the index of dragged item.
          event.currentIndex,
        );
      }

      this.draggedItem = null; // Clear the dragged item

      // call pop up if all items are moved
         if(!this.items?.length)
           this.openDialog();
    }


    console.log('drop2', event, this.items, this.dropIntoList)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResetDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.resetGrid()

    });
  }
  // items = [
  //   { col1: 'Item 1 Text', col2: 'Item 1 Text', col3: 'Item 1 Text' },
  //   { col1: 'Item 2 Text', col2: 'Item 2 Image', col3: 'Item 2 Text' },
  //   { col1: 'Item 3 Text', col2: 'Item 3 Image', col3: 'Item 3 Text' }
  // ];

  draggedItem: any;

  constructor(private elementRef: ElementRef, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.createCanvas();
    this.resetGrid();
    this.resetItems = [...this.items]
  }

  onDragStartCdk(event: CdkDragStart, item: any): void {
    console.log('Drag start Event:', event);
    this.draggedItem = item;
    // event.dataTransfer?.setData('text', JSON.stringify(item));
  }

  validateDropPoint(event: CdkDragDrop<Array<any>>): boolean {
    console.log('Drop Event:', event,this.draggedItem);

    let { x, y } = event?.dropPoint; // p5.js mouse coordinates
    const item = this.draggedItem;

     // Get the p5 canvas position
  const canvasElement = this.p5.canvas; // Assuming you have the p5 canvas stored as this.p5.canvas
  const canvasRect = canvasElement.getBoundingClientRect(); // Get the bounding rectangle of the canvas

  // Adjust drop coordinates relative to the p5 canvas
  x = x - canvasRect.left;
  y = y - canvasRect.top;

    if (item) {
      const inCircleA = this.isInsideCircle(x, y, 150, 200, 100); // Circle A
      const inCircleB = this.isInsideCircle(x, y, 250, 200, 100); // Circle B

      if (item.category === this.categories[0] && inCircleA && !inCircleB ) {
        alert(`Item ${item.name} dropped in correct area ${ this.categories[0]}!`);
      } else if (item.category === this.categories[1] && inCircleB && !inCircleA) {
        alert(`Item ${item.name} dropped in correct area ${ this.categories[1]}!`);
      } else if (item.category === this.categories[2] && inCircleA && inCircleB) {
        alert(`Item ${item.name} dropped in correct intersection area ${ this.categories[2]}!`);
      } else {
        alert(`Item ${item.name} dropped in wrong area.`);
        return false;
      }
    }

    
    return true;
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
      // canvas.elt.addEventListener('drop', (event: DragEvent) => {
      //   this.onDrop(event);
      // });
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
      p.textSize(11);
      p.text(this.categories[0], 110, 120);
      p.text(this.categories[1], 240, 120);
      p.text(this.categories[2], 175, 150);
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
