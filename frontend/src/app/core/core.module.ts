import {NgModule, Optional, SkipSelf} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EnsureImportedOnceModule} from "./ensureImportedOnceModule";
import { ListsComponent } from './components/lists/lists.component';
import {ApiHttpService} from "./services/api-http.service";
import {ApiEndpointsService} from "./services/api-endpoint.service";
import {HttpClientModule} from "@angular/common/http";
import {Constants} from "../config/constants";
import { AddItemComponent } from './components/add-item/add-item.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { ListComponent } from './components/list/list.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ListEditComponent } from './components/list-edit/list-edit.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    CoreComponent,
    ListsComponent,
    AddItemComponent,
    ListComponent,
    ListEditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [ApiHttpService, ApiEndpointsService, Constants],
  bootstrap: [CoreComponent]
})
export class CoreModule extends EnsureImportedOnceModule{
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
}
