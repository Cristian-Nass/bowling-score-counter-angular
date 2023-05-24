import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="button button--{{ type }}" [type]="buttonType" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['button.component.scss']
})
export class ButtonComponent {
  @Input() public buttonType: 'submit' | 'reset' | 'button' = 'button';
  @Input() public type: 'primary' |'secondary' = 'primary';
  @Input() public disabled?: boolean;
  @Output() public clicked = new EventEmitter();

  public onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
