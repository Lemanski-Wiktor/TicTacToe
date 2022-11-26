import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value" class="btn--input">{{ value }}</button>
    <button
      nbButton
      hero
      status="success"
      *ngIf="value == 'X'"
      class="btn--input"
    >
      {{ value }}
    </button>
    <button nbButton hero status="info" *ngIf="value == 'O'" class="btn--input">
      {{ value }}
    </button>
  `,
  styles: [
    'button { width: 100%; height: 100%; font-size: 5em !important; background-color: #eae2b7; cursor: pointer}',
  ],
})
export class SquareComponent {
  @Input() value!: 'O' | 'X';
}
