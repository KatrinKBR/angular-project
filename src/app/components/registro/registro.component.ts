import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit {
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

  register() {
    console.log(this.userForm.value)
  }

}
