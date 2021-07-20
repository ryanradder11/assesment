import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ListService} from "../../services/list.service";
import {List} from "../../models/list";
import {ListItem} from "../../models/listItem";
import {tap} from "rxjs/operators";
import {DialogService} from "../../services/dialog.service";
import {Subscription} from "rxjs";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();
  listNameControl = new FormControl(this.list.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  itemNameControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  changeTitle = false;
  addItem = false;

  constructor(
    public dialogRef: MatDialogRef<ListEditComponent>,
    private listService: ListService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public list: List) {
  }

  onNoClick(): void {
    this.listNameControl.setValue(this.list.name);
    this.changeTitle = false;
  }

  onUpdateClick() {
    this.list.name = this.listNameControl.value;
    this.snackbarService.showSnackbarDuration('Lijst naam succesvol geupdate');
  }

  deleteListItem(list: List, listItem: ListItem) {
    this.subscriptions.add(this.listService.deleteListItem(list, listItem).pipe(
      tap({
        next: () => {
          const listItemToDelete = list.items.find(item => (item.id === listItem.id));
          list.items.forEach((listItem, index) => {
            if (listItemToDelete === listItem) {
              list.items.splice(index, 1)
              this.snackbarService.showSnackbarDuration('Todo item succesvol verwijderd');
            }
          });
        },
        error: () => {
        }
      }),
    ).subscribe());
  }

  addedItem(event: any) {
    this.addItem = false;
  }

  editListItem(listItem: ListItem) {
    listItem.editable = true;
    this.itemNameControl.setValue(listItem.name);
  }

  updateItem(listItem: ListItem) {
    listItem.name = this.itemNameControl.value;
    this.listService.updateTodoItem(this.list, listItem).pipe(
      tap({
        next: (Item: { data: ListItem }) => {
          listItem.editable = false;
          this.itemNameControl.reset();
          this.snackbarService.showSnackbarDuration('Todo item succesvol gewijzigd');
        },
        error: () => {
        }
      })
    )
      .subscribe();
  }

  onclickViewList(listId: string) {
    this.dialogRef.close();
    this.dialogService.openDialog(listId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
