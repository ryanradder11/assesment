import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListComponent} from "./list.component";
import {ApiEndpointsService} from "../../services/api-endpoint.service";
import {ApiHttpService} from "../../services/api-http.service";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {Constants} from "../../../config/constants";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {List} from "../../models/list";
import {By} from "@angular/platform-browser";


fdescribe('ListModalComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockList: List = {
    id: '4',
    name: 'test',
    items: [
      {name: 'boter', id: '1', completed: false, editable: false},
      {name: 'kaas', id: '2', completed: true, editable: false},
      {name: 'eieren', id: '3', completed: false, editable: true},
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      declarations: [ListComponent],
      providers: [Constants, ApiEndpointsService, ApiHttpService, {
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
        {provide: MAT_DIALOG_DATA, useValue: mockList}

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain correct title', () => {
    expect(component.list.name).toBe('test');
  });

  it('should show 3 items', () => {
    const numberOfMatFormFields = fixture.debugElement.queryAll(By.css('mat-list-option')).length;
    expect(numberOfMatFormFields).toEqual(3);
  });

});
