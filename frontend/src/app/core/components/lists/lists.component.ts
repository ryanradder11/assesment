import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {List} from "../../models/list";
import {ListService} from "../../services/list.service";
import {MatDialog} from "@angular/material/dialog";
import {ListComponent} from "../list/list.component";
import {tap} from "rxjs/operators";
import {ListEditComponent} from "../list-edit/list-edit.component";
import {DialogService} from "../../services/dialog.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  public lists$: Observable<Array<List>>;

  constructor(
    private listService: ListService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.lists$ = this.listService.getListsAsObersable();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.listService.getLists().subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  delete(id: string) {
    this.subscriptions.add(this.listService.deleteList(id).pipe(
      tap({
        next: _ => {
          this.snackbarService.showSnackbarDuration('Lijst succesvol verwijderd');
        },
        error: () => {
        }
      })
    ).subscribe());
  }

  openEditDialog(listId: string): void {
    this.dialogService.openEditDialog(listId);
  }

  openDialog(listId: string): void {
    this.dialogService.openDialog(listId);
  }
}

