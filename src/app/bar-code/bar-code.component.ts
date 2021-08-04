import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { ConfirmationDialog } from './confirmation-dialog.component';
@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.css'],
})
export class BarCodeComponent implements OnInit, AfterViewInit {
  dataSource = [
    {
      sheetNo: 15,
      slNo: 1,
      grossWt: 10.09,
      beads: 1.079,
      netWt: 9.04,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '015/01',
    },
    {
      sheetNo: 15,
      slNo: 2,
      grossWt: 13.1,
      beads: 4.0026,
      netWt: 11.65,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '015/02',
    },
    {
      sheetNo: 15,
      slNo: 3,
      grossWt: 11.92,
      beads: 6.941,
      netWt: 10.28,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '015/03',
    },
    {
      sheetNo: 15,
      slNo: 4,
      grossWt: 11.08,
      beads: 9.012,
      netWt: 10.08,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '015/04',
    },
    {
      sheetNo: 15,
      slNo: 5,
      grossWt: 13.05,
      beads: 1.811,
      netWt: 12.26,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '015/05',
    },
    {
      sheetNo: 16,
      slNo: 1,
      grossWt: 11.29,
      beads: 1.017,
      netWt: 9.73,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '016/01',
    },
    {
      sheetNo: 16,
      slNo: 2,
      grossWt: 11.09,
      beads: 1.067,
      netWt: 10.03,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '016/02',
    },
    {
      sheetNo: 16,
      slNo: 3,
      grossWt: 11.26,
      beads: 1.994,
      netWt: 9.44,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '016/03',
    },
    {
      sheetNo: 16,
      slNo: 4,
      grossWt: 11.67,
      beads: 1.994,
      netWt: 11.22,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '016/04',
    },
    {
      sheetNo: 16,
      slNo: 5,
      grossWt: 10.44,
      beads: 2.197,
      netWt: 10.99,
      A: 64,
      B: '',
      D: '',
      E: 5,
      karigarName: 'MAS',
      exclNo: '016/05',
    },
  ];
  displayedColumns = [
    'slNo',
    'grossWt',
    'beads',
    'netWt',
    'A',
    'B',
    'D',
    'E',
    'karigarName',
    'exclNo',
    'barcode',
  ];

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent = new BarcodeScannerLivestreamComponent();

  barcodeValue: any;
  value: any;
  barcodeValue1: any;
  sheets: number[] = [];
  dataSourceCopy: never[] &
    {
      sheetNo: number;
      slNo: number;
      grossWt: number;
      beads: number;
      netWt: number;
      A: number;
      B: string;
      D: string;
      E: number;
      karigarName: string;
      exclNo: string;
    }[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.barcodeValue1 = 'saurabh';
    this.dataSource.forEach((d: any) => {
      // d.barcodeValue = window.btoa(
      //   JSON.stringify({ karigarName: d.karigarName, exclNo: d.exclNo })
      // );
      d.barcodeValue = JSON.stringify(d);
    });

    this.dataSourceCopy = Object.assign([], this.dataSource);
    this.sheets = [...new Set(this.dataSource.map((item) => item.sheetNo))];
  }

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    alert(window.atob(result.codeResult.code));

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to confirm scanned product?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
      }
    });
  }

  onStarted(started: any) {
    console.log(started);
  }

  onSheetChange(e: any) {
    this.dataSource = this.dataSourceCopy.filter((d: any) => {
      return d.sheetNo === e.value;
    });
  }
}
