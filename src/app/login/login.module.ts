import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from '../components/message/message.module';

@NgModule({
    declarations: [ 
        LoginComponent 
    ],
    imports: [ 
        CommonModule, 
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        MessageModule
    ]
})
export class LoginModule{}