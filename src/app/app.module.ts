import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxBarcodeModule } from 'ngx-barcode';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarCodeComponent } from './bar-code/bar-code.component';
import { ConfirmationDialog } from './bar-code/confirmation-dialog.component';
import { CallingComponent } from './calling/calling.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { ScannerComponent } from './scanner/scanner.component';

@NgModule({
  declarations: [
    BarCodeComponent,
    AppComponent,
    RegistrationComponent,
    ScannerComponent,
    GuestListComponent,
    NavbarComponent,
    CallingComponent,
    ConfirmationDialog,
  ],
  imports: [
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    NgxBarcodeModule,
    NgxBarcode6Module,
    BrowserAnimationsModule,
    BarcodeScannerLivestreamModule,
    AppRoutingModule,
    NgxQRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ReactiveFormsModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatTableModule, MatSelectModule, MatButtonModule],
  entryComponents: [ConfirmationDialog],
})
export class AppModule {}
