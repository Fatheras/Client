
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTableModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  exports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
  ]
})
export class MaterialModule { }
