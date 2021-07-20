import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListEditComponent} from './list-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Constants} from "../../../config/constants";
import {ApiEndpointsService} from "../../services/api-endpoint.service";
import {ApiHttpService} from "../../services/api-http.service";

describe('ListEditComponent', () => {
  let component: ListEditComponent;
  let fixture: ComponentFixture<ListEditComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEditComponent],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [Constants, ApiEndpointsService, ApiHttpService,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
