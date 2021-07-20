import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {tap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {List} from "../../models/list";
import {EventEmitter} from '@angular/core';
import {SnackbarService} from "../../services/snackbar.service";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnDestroy {

  @Input() inputList?: List;
  @Input() itemName: string = '';
  @Output() newItemAddedSucces = new EventEmitter<boolean>();

  subscriptions: Subscription = new Subscription();
  listNameControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  constructor(
    private listService: ListService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  add() {
    if (this.inputList) {
      //Add Item
      this.subscriptions.add(
        this.listService.addItemToList(this.inputList, this.listNameControl.value).pipe(
          tap({
            next: _ => {
              this.snackbarService.showSnackbarDuration('Todo item succesvol toegevoegd');
            },
            error: () => {
            }
          })
        ).subscribe()
      )
      this.listNameControl.reset();
      this.newItemAddedSucces.emit(true)
    } else {
      //Add list
      this.subscriptions.add(
        this.listService.addList(this.listNameControl.value).pipe(
          tap({
            next: (lis: {data: List}) => {
              this.listNameControl.reset();
              this.snackbarService.showSnackbarDuration('Lijst succesvol toegevoegd');
            },
            error: _ => {
            },
          })
        ).subscribe()
      );
    }

  }


}
