import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListEditComponent} from './list-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Constants} from "../../../config/constants";
import {ApiEndpointsService} from "../../services/api-endpoint.service";
import {ApiHttpService} from "../../services/api-http.service";
import {List} from "../../models/list";
import {By} from "@angular/platform-browser";

fdescribe('ListEditComponent', () => {
  let component: ListEditComponent;
  let fixture: ComponentFixture<ListEditComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockList: List = {
    id: '4',
    name: 'test',
    items: [
      {name: 'boter', id: '1', completed: false, editable: false },
      {name: 'kaas', id: '2', completed: true, editable: false },
      {name: 'eieren', id: '3', completed: false, editable: true },
    ]
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
        {provide: MAT_DIALOG_DATA, useValue: mockList}
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

  it('should show 1 editable item', () => {
    const numberOfMatFormFields = fixture.debugElement.queryAll(By.css('#item-name')).length;
    expect(numberOfMatFormFields).toEqual(1);
  });
});
