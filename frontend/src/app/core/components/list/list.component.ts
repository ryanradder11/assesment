import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {List} from "../../models/list";
import {FormControl, Validators} from "@angular/forms";
import {ListItem} from "../../models/listItem";
import {ListService} from "../../services/list.service";
import {tap} from "rxjs/operators";
import {DialogService} from "../../services/dialog.service";
import {Subscription} from "rxjs";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-list-modal',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();
  listNameControl = new FormControl(this.list.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  changeTitle = false;
  addItem = false;

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    private listService: ListService,
    private dialogService: DialogService,
    private snackbarSerivce: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public list: List) {
  }

  onNoClick(): void {
    this.listNameControl.setValue(this.list.name);
    this.changeTitle = false;
  }

  onUpdateClick() {
    this.list.name = this.listNameControl.value;
    this.dialogRef.close(this.list)
  }

  deleteListItem(list: List, listItem: ListItem) {
    this.listService.deleteListItem(list, listItem).pipe(
      tap({
        next: () => {
          this.snackbarSerivce.showSnackbarDuration('Lijst verwijderd')
        },
        error: () => {
        }
      })
    ).subscribe();
  }

  selectionChange(event: { option: { value: ListItem, selected: boolean } }) {
    let todoItem = event.option.value;
    todoItem.completed = event.option.selected;

    this.subscriptions.add(
      this.listService.updateTodoItem(this.list, todoItem).pipe(
        tap({
          next: () => {
            todoItem.completed = event.option.selected;
            this.snackbarSerivce.showSnackbarDuration(event.option.selected ? 'Todo afgevinkt' : 'Todo ongedaan gemaakt');
          },
          error: () => {
            todoItem.completed = !event.option.selected;
          }
        }),
      ).subscribe());
  }

  onClickUpdate(listId: string) {
    this.dialogRef.close();
    this.dialogService.openEditDialog(listId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
