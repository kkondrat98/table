import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Users } from '../app/models/users';
import { DataService } from '../app/services/data.service';
import { AddUserComponent } from '../app/users/add-user/add-user.component'
import { DeleteUserComponent } from '../app/users/delete-user/delete-user.component'
import { EditUserComponent } from '../app/users/edit-user/edit-user.component'
import { EditRegulationComponent } from './edit-regulation/edit-regulation.component';
import { Address } from './models/address';
import { Regulation } from './models/regulation.model';
import { RegulationService } from './services/regulation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Regulations';
  displayedColumns: string[] = ['id', 'country', 'state', 'vertical', 'status', 'brand'];
  dataSource: any;
  // users: Users[];
  // user: Users;
  index: number;
  id: number;

  regulations: Regulation[];
  regulation: Regulation;

  constructor(private dataService: DataService,
    private regulationService: RegulationService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    // this.getUsers();
    this.getRegulations();

  }
  // addUser(): void {
  //   const dialogRef = this.dialog.open(AddUserComponent
  //   );
  //   const sub = dialogRef.componentInstance.isUserAdded.subscribe((data: any) => {

  //     data.id = this.users.length + 1;
  //     this.users.splice(0, 0, data);
  //     this.ref.detectChanges();

  //     this.dataSource = this.users;
  //     this.dataSource = new MatTableDataSource<any>(this.users);
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  // }
  // editDialog(i: number, id: number) {
  //   this.id = id;
  //   const dialogRef = this.dialog.open(EditUserComponent, {
  //     data: { id: id }
  //   });
  //   const sub = dialogRef.componentInstance.isUserUpdated.subscribe((data: any) => {
  //     this.users.splice(i, 1);
  //     data.id = this.id;
  //     this.users.splice(i, 0, data);
  //     this.ref.detectChanges();
  //     this.dataSource = this.users;
  //     this.dataSource = new MatTableDataSource<any>(this.users);
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       //do something on success
  //     }
  //   });
  // }

  editRegulationDialog(i: number, id: number) {
    this.id = id;
    const dialogRef = this.dialog.open(EditRegulationComponent, {
      data: { id: id }
    });
    const sub = dialogRef.componentInstance.isRegulationUpdated.subscribe((data: any) => {
      this.regulations.splice(i, 1);
      data.id = this.id;
      this.regulations.splice(i, 0, data);
      this.ref.detectChanges();
      this.dataSource = this.regulations;
      this.dataSource = new MatTableDataSource<any>(this.regulations);
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //do something on success
      }
    });
  }
  // deleteDialog(i: number, id: number, name: string, username: string, email: string, phone: string, city: string, zipcode: string) {

  //   const dialogRef = this.dialog.open(DeleteUserComponent, {
  //     data: { id: id, name: name, username: username, email: email, phone: phone, city: city, zipcode: zipcode }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       //do something on success
  //       this.users.splice(i, 1);
  //     this.ref.detectChanges();
  //     this.dataSource = this.users;
  //     this.dataSource = new MatTableDataSource<any>(this.users);
  //     }
      
  //   });
  // }
  // getUsers(): void {
  //   this.dataService.getUsers()
  //     .subscribe(serviceResult => {
  //       this.users = serviceResult;
  //       this.dataSource = this.users;
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }

  getRegulations(): void {
    this.regulationService.getRegulations()
      .subscribe(serviceResult => {
        this.regulations = serviceResult;
        this.dataSource = this.regulations;
        this.dataSource.paginator = this.paginator;
      });
  }
}
