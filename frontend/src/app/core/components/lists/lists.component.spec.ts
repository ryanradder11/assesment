import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsComponent } from './lists.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ListComponent} from "../list/list.component";
import {Constants} from "../../../config/constants";
import {ApiEndpointsService} from "../../services/api-endpoint.service";
import {ApiHttpService} from "../../services/api-http.service";

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsComponent ],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [Constants, ApiEndpointsService, ApiHttpService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
