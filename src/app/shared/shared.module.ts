import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ButtonComponent]
})
export class SharedModule {}
