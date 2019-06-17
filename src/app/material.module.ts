import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
