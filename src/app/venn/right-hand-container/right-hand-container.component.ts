import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-right-hand-container',
  templateUrl: './right-hand-container.component.html',
  styleUrls: ['./right-hand-container.component.scss']
})
export class RightHandContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items = [
    { col1: 'Item 1 Text', col2: 'Item 1 Text', col3: 'Item 1 Text' },
    { col1: 'Item 2 Text', col2: 'Item 2 Image', col3: 'Item 2 Text' },
    { col1: 'Item 3 Text', col2: 'Item 3 Image', col3: 'Item 3 Text' }
  ];

  // Method to handle drag and drop
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

}
