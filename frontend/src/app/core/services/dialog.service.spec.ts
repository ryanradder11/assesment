import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Constants} from "../../config/constants";
import {ApiEndpointsService} from "./api-endpoint.service";
import {ApiHttpService} from "./api-http.service";

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [Constants, ApiEndpointsService, ApiHttpService],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
