import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RegulationService } from '../services/regulation.service';
import { Regulation } from '../models/regulation.model';

@Component({
    selector: 'edit-regulation.component',
    templateUrl: './edit-regulation.component.html',
    styleUrls: ['./edit-regulation.component.scss']
})

export class EditRegulationComponent implements OnInit {
    editRegulationForm: FormGroup;
    regulation: Regulation;
    @Output() isRegulationUpdated = new EventEmitter();
    constructor(public dialogRef: MatDialogRef<EditRegulationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private regulationService: RegulationService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit() {

        this.buildForm();
        this.getRegulation(this.data.id);
    }
    buildForm() {
        this.editRegulationForm = this.fb.group({
            country: ['', Validators.required],
            state: ['', Validators.required],
            vertical: ['', Validators.required],
            status: ['', Validators.required],
            brand: ['', Validators.required],
        });
    }
    public getRegulation(id: number): void {
        this.regulationService.getRegulation(id)
            .subscribe(serviceResult => {
                this.editRegulationForm.patchValue(serviceResult);
            });
    }
    public updateRegulation(): void {
        this.regulation = Object.assign({}, this.editRegulationForm.value);
        this.regulationService.updateRegulation(this.data.id, this.regulation)
            .subscribe(serviceResult => {
                this.isRegulationUpdated.emit(this.regulation);
                this.dialogRef.close();
                this._snackBar.open('Regulation updated succesfully.', 'updated', {
                    duration: 2000,
                  });

            });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
