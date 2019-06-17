import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MotivosService } from '../../services/motivos.service';
import { Motivos } from '../../models/motivo';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  motivos: Motivos[];
  motivo: Motivos = new Motivos();
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['motivo', 'desc', 'tipo', 'estado'];
  expandedElement: Motivos | null;
  go = true;
  msj = "";
  filter="";

  @ViewChild(MatSort, <any>{static:true}) sort: MatSort;
  @ViewChild(MatPaginator, <any>{static: true}) paginator: MatPaginator;

  constructor(
    private service: MotivosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 
  }

  
  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(){
    this.service.getAll().subscribe(data => {
      this.motivos = data;
      this.dataSource = new MatTableDataSource<Motivos>(this.motivos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if(this.filter!=""){
        this.applyFilter(this.filter);
      }
    });
  }

  update(data:Motivos){
    if(
      data.motivo
      && data.desc != ""
      && data.tipo != ""
      && data.estado != ""
    ){
      this.service.update(data).subscribe(res => {
        this.loadInfo();
        this.go=true;
        this.openSnackBar("Registro Actualizado", "Cerrar");
      }, (err => {
        this.go=false;
        this.msj = err.error.message;
      }));
      
    }else{
      this.go=false;
      this.msj = "Formulario Invalido!"
    }
  }

  delete(id:number){
    if(id){
      this.service.delete(id).subscribe(res => {
        this.loadInfo();
        this.go=true;
        this.openSnackBar("Registro Eliminado", "Cerrar");
      }, (err => {
        this.go=false;
        this.msj = err.error.message;
      }));
    }else{
      this.go=false;
      this.msj = "Formulario Invalido!"
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data: {motivo: "", desc: "", tipo: "", estado: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadInfo();
        this.openSnackBar("Registro Agregado", "Cerrar");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewDialog {
  go = true;
  msj = "";
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Motivos,
    private service: MotivosService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onClick(data:Motivos): void{
    if(
      data.motivo 
      && data.desc != ""
      && data.tipo != ""
      && data.estado != ""
    ){
      this.service.save(data).subscribe(data => {
        this.dialogRef.close(true);
      }, (err => {
        this.go=false;
        this.msj = err.error.message;
      }));
      
    }else{
      this.go=false;
      this.msj = "Formulario Invalido!"
    }
    
  }

}
