import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';
import { ConfirmationDialog } from '../bar-code/confirmation-dialog.component';
import { CUSTOMERS } from '../constants';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
})
export class ScannerComponent implements OnInit {
  @ViewChild('TABLE')
  table!: ElementRef;
  availableDevices: MediaDeviceInfo[] = [];
  deviceCurrent: MediaDeviceInfo | undefined;
  deviceSelected: string = '';
  array = [];
  customers = CUSTOMERS;
  selectedCustomer: any;
  dataSource: any = [];
  displayedColumns = [
    'slNo',
    'custName',
    'grossWt',
    'beads',
    'netWt',
    'A',
    'B',
    'D',
    'E',
    'karigarName',
    'exclNo',
    'createdTime',
  ];

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODABAR,
    BarcodeFormat.MAXICODE,
    BarcodeFormat.ITF,
    BarcodeFormat.AZTEC,
    BarcodeFormat.PDF_417,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean = false;
  hasPermission: boolean = false;

  qrResultString: string = '';

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  dialogRef: any = null;
  scannedProducts: any = [];

  constructor(private dialog: MatDialog, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  //Clears the QR code scanned
  clearResult(): void {
    this.qrResultString = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  //Scans the QR code
  onCodeResult(resultString: any): void {
    if (this.dialogRef === null) {
      this.dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          message: 'Are you sure want to confirm scanned product?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No',
          },
        },
      });
      this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          resultString = JSON.parse(resultString);
          resultString.custName = this.selectedCustomer.value;
          resultString.createdTime = new Date().toLocaleString('en-GB');
          this.scannedProducts.push(resultString);
          this.dataSource = [];
          this.dataSource = Object.assign([], this.scannedProducts);
        }
        this.dialogRef = null;
      });
    }

    // this.guestExist = false;
    // if (this.checkQRJSON(resultString)) {
    //   this.qrResult = JSON.parse(resultString);
    //   this.checkInGuest(this.qrResult);
    //   this.clearMessage();
    // } else {
    //   this.guestExist = false;
    //   this.clearMessage();
    // }
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  //Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  //This function check if the QR code has a valid JSON as data
  checkQRJSON(qrString: string): boolean {
    if (
      /^[\],:{}\s]*$/.test(
        qrString
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            ']'
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onSelectionChange(value: any) {
    this.selectedCustomer = value;
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      this.selectedCustomer.value + '-Sheet'
    );

    /* save to file */
    XLSX.writeFile(
      wb,
      this.selectedCustomer.value +
        '-' +
        new Date().toLocaleString('en-GB') +
        '-Sheet.xlsx'
    );
  }
}
