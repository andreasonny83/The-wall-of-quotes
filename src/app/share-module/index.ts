import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ShareComponent } from './share.component';

const DIRECTIVES = [ShareComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [
    DIRECTIVES
  ],
  exports: [DIRECTIVES]
})
export class ShareModule { }
