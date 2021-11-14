import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ MessageComponent ],
    imports: [ CommonModule ],
    exports: [ MessageComponent ]
})
export class MessageModule{

}