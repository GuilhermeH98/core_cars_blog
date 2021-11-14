import { Component, Input } from '@angular/core';
import { MessageTypes } from 'src/app/model/MessageTypes';

@Component({
    selector: 'bg-message',
    templateUrl: './message.component.html'
})
export class MessageComponent{
    @Input() message: string;
    @Input() messageType: MessageTypes;
    type = MessageTypes;
}