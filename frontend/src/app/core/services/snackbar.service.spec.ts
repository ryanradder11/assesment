import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ListComponent} from "../components/list/list.component";

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [ListComponent],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
