import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../core/api/api.service';
import { MessageTypes } from '../model/MessageTypes';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  message: string = "";
  messageType: MessageTypes;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }

  login(){
    const email: string = this.loginForm.get('email').value;
    const password: string = this.loginForm.get('password').value;

    this.apiService
      .login(email, password)
      .subscribe((response) => {
        this.loginForm.reset();
        this.message = "";
        this.messageType = null;
        this.router.navigate(['cars'])
      }, (error) => {
        this.loginForm.reset();
        if(error.status === 401){
          this.message = "Incorrect crendentials"
          this.messageType = MessageTypes.ERROR;
        }
      });

  }

}
