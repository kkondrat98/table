import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'add-user.component',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  user: Users;
  @Output() isUserAdded = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: this.fb.group({ // make a nested group
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
    });
  }
  public addNewUser(): void {
    this.user = Object.assign({}, this.addUserForm.value);
    this.dataService.addUser(this.user)
      .subscribe(serviceResult => {
        this.isUserAdded.emit(this.user);
        this.dialogRef.close();
        this._snackBar.open('User created succesfully.', 'Created', {
          duration: 2000,
        });
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
