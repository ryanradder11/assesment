import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddItemComponent} from './add-item.component';
import {ApiHttpService} from "../../services/api-http.service";
import {ApiEndpointsService} from "../../services/api-endpoint.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {Constants} from "../../../config/constants";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [AddItemComponent],
      providers: [ApiHttpService, ApiEndpointsService, HttpClient, HttpHandler, Constants, MatSnackBar, ApiHttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
