import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/users-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userForm!: FormGroup;
  allUsersData!: User[];
  onDestroy$ = new Subject<any>();
  showAddBtn: boolean = false;
  showEditBtn: boolean = false;
  
  constructor(private fb: FormBuilder, private usersApi: UsersApiService) {
    this.userForm = this.fb.group({
      userId: '',
      username: '',
      name: '',
      lastName: '',
      email: '',
      birthDate: '',
      password: ''
    })
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.usersApi.getUsers<User[]>(environment.USERS_URL).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.allUsersData = data;
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  addNewBtnClicked() {
    // Esconde el boton de Modificar y muestra el de Agregar
    this.showEditBtn = false;
    this.showAddBtn = true;
    // Vacía el formulario en caso de que se haya hecho click a modificar y no se envió
    this.userForm.reset();
  }

  addUser() {
    let user: User = {
      id: Number(this.userForm.value.userId),
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      birthDate: this.userForm.value.birthDate,
      password: this.userForm.value.password
    };

    this.usersApi.postUser<User>(environment.USERS_URL, user).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        console.log(`Usuario añadido exitosamente`);
        // Resetea el formulario, cierra el modal y refresca la tabla
        this.userForm.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllUsers()
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  editBtnClicked(user: User) {
    // Esconde el boton de Agregar y muestra el de Modificar
    this.showAddBtn = false;
    this.showEditBtn = true;

    // Setea los valores del formulario en base a lo que tenga el objeto
    this.userForm.controls['userId'].setValue(user.id);
    this.userForm.controls['username'].setValue(user.username);
    this.userForm.controls['name'].setValue(user.name);
    this.userForm.controls['lastName'].setValue(user.lastName);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['birthDate'].setValue(user.birthDate);
    this.userForm.controls['password'].setValue(user.password);
  }

  editUser() {
    let user: User = {
      id: Number(this.userForm.value.userId),
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      birthDate: this.userForm.value.birthDate,
      password: this.userForm.value.password
    };

    this.usersApi.putUser<User>(environment.USERS_URL, user.id, user).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        console.log(`Usuario editado exitosamente: ${data}`);
        // Resetea el formulario, cierra el modal y refresca la tabla
        this.userForm.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllUsers()
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  deleteUser(id: number) {
    this.usersApi.deleteUser<User>(environment.USERS_URL, id).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        console.log(`Usuario eliminado exitosamente: ${data}`);
        // Refresca la tabla
        this.getAllUsers()
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }
}
