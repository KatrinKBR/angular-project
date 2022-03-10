import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../userForm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  
  user: UserInterface = {
    name: 'Maria',
    lastName: 'Perez',
    email: 'mariaperez@gmail.com',
    birthDate: '1990-12-12',
    password: 'test',
    isChecked: false
  }

  userForm!: FormGroup; 

  constructor(private fb: FormBuilder) { 
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      birthDate: ['', Validators.required],
      password: ['', Validators.required], 
      isChecked: [false, Validators.requiredTrue]
    })
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.userForm.value)
  }

}
