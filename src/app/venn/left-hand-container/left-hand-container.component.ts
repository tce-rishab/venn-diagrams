import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as p5 from 'p5';
import { ResetDialogComponent } from '../reset-dialog/reset-dialog.component';
import { VennDiagramI } from '../venn.interface';
import { VENNOBJECT } from '../data.json';
@Component({
  selector: 'app-left-hand-container',
  templateUrl: './left-hand-container.component.html',
  styleUrls: ['./left-hand-container.component.scss']
})
export class LeftHandContainerComponent implements OnInit, AfterViewInit {
  private p5: any;
  vennObject = VENNOBJECT?.sports
  shuffledItems: any[] = [];
  resetItems: Array<VennDiagramI> = [];
  sourceClick: any;
  DestinationClick: any;
  categories: Array<{ id: string, label: string }> = this.vennObject?.catagories;
  items: Array<VennDiagramI> = this.vennObject?.items
  id = this.vennObject?.id;
  subtitle = this.vennObject?.subtitle;
  sampleSpace = this.vennObject?.type;
  dropIntoList: Array<VennDiagramI> = [];
  draggedItem: any;


  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Method to reset and shuffle the grid items
  resetGrid() {
    if (this.items?.length)
      this.shuffledItems = this.shuffleArray(this.items); // Shuffle a copy of the items array
    else {
      const listCopy = JSON.parse(JSON.stringify(this.resetItems));
      this.shuffledItems = this.shuffleArray(listCopy);
      this.items = listCopy
    }

  }

  drop(event: CdkDragDrop<Array<VennDiagramI>>) {
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
      if (!this.items?.length)
        this.openDialog();
    }


    console.log('drop', event, this.items, this.dropIntoList)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResetDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.resetGrid()

    });
  }

 

  constructor(private elementRef: ElementRef, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.categories = CATEGORIES.slice();
    this.resetGrid();
    const listCopy = JSON.parse(JSON.stringify(this.items));
    this.resetItems = this.shuffleArray(listCopy);
    // this.resetItems = [...this.items];

  }

  ngAfterViewInit(): void {
    this.createCanvas()
  }

  onDragStartCdk(event: CdkDragStart, item: any): void {
    console.log('Drag start Event:', event);
    this.draggedItem = item;
    // event.dataTransfer?.setData('text', JSON.stringify(item));
  }

  onSourceClick(e: any, i: any): void {
    console.log(e, i)
    this.sourceClick = i;
  }

  onDestinationClick(e: any): void {
    const index = this.items?.findIndex(item => item?.name === this.sourceClick?.name);
    let isTransferarble = true;
    console.log(e)
    // Get the p5 canvas position
    const canvasElement = this.p5.canvas; // Assuming you have the p5 canvas stored as this.p5.canvas
    // e.clientX, e.clientY
    const canvasRect = canvasElement?.getBoundingClientRect(); // Get the bounding rectangle of the canvas
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    if (this.sourceClick) {

      const inCircleA = this.isInsideCircle(x, y, 150, 200, 100); // Circle A
      const inCircleB = this.isInsideCircle(x, y, 250, 200, 100); // Circle B

      if (this.sourceClick.category === this.categories[0]?.id && inCircleA && !inCircleB) {
        alert(`Item ${this.sourceClick.name} dropped in correct area ${this.categories[0]?.label}!`);
      } else if (this.sourceClick.category === this.categories[1]?.id && inCircleB && !inCircleA) {
        alert(`Item ${this.sourceClick.name} dropped in correct area ${this.categories[1]?.label}!`);
      } else if (this.sourceClick.category === this.categories[2]?.id && inCircleA && inCircleB) {
        alert(`Item ${this.sourceClick.name} dropped in correct intersection area ${this.categories[2]?.label}!`);
      } else {
        alert(`Item ${this.sourceClick.name} dropped in wrong area.`);
        // return false;
        isTransferarble = false;
        // this.sourceClick = null;
      }
    }
    if (isTransferarble && index >= 0) {
      transferArrayItem(
        this.items,
        this.dropIntoList,
        index,               //calculate the index of dragged item.
        0
      );
      console.log('click_transfer', this.items, this.dropIntoList)
      this.sourceClick = null;
    }

    // call pop up if all items are moved
    if (!this.items?.length)
      this.openDialog();
  }

  validateDropPoint(event: CdkDragDrop<Array<any>>): boolean {
    console.log('Drop Event:', event, this.draggedItem);

    let { x, y } = event?.dropPoint; // p5.js mouse coordinates
    const item = this.draggedItem;
    // Get the p5 canvas position
    const canvasElement = this.p5.canvas; // Assuming you have the p5 canvas stored as this.p5.canvas
    const canvasRect = canvasElement?.getBoundingClientRect(); // Get the bounding rectangle of the canvas

    // Adjust drop coordinates relative to the p5 canvas
    x = x - canvasRect.left;
    y = y - canvasRect.top;

    if (item) {
      const inCircleA = this.isInsideCircle(x, y, 150, 200, 100); // Circle A
      const inCircleB = this.isInsideCircle(x, y, 250, 200, 100); // Circle B

      if (item.category === this.categories[0]?.id && inCircleA && !inCircleB) {
        alert(`Item ${item.name} dropped in correct area ${this.categories[0]?.label}!`);
      } else if (item.category === this.categories[1]?.id && inCircleB && !inCircleA) {
        alert(`Item ${item.name} dropped in correct area ${this.categories[1]?.label}!`);
      } else if (item.category === this.categories[2]?.id && inCircleA && inCircleB) {
        alert(`Item ${item.name} dropped in correct intersection area ${this.categories[2]?.label}!`);
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
      p.text(this.categories[0]?.label, 110, 120);
      p.text(this.categories[1]?.label, 240, 120);
      p.text(this.categories[2]?.label, 175, 150);
    };
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
