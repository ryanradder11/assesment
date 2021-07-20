import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ApiHttpService} from "./api-http.service";
import {ApiEndpointsService} from "./api-endpoint.service";
import {Constants} from "../../config/constants";

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [ApiHttpService, ApiEndpointsService, Constants]
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
