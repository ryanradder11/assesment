import {Injectable} from '@angular/core';
import {tap} from "rxjs/operators";
import {ListEditComponent} from "../components/list-edit/list-edit.component";
import {Subscription} from "rxjs";
import {ListService} from "./list.service";
import {MatDialog} from "@angular/material/dialog";
import {ListComponent} from "../components/list/list.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  subscriptions: Subscription = new Subscription();

  constructor(
    private listService: ListService,
    public dialog: MatDialog,
  ) {
  }

  openDialog(listId: string): void {
    this.subscriptions.add(this.listService.getList(listId).pipe(
      tap(result => {
        const dialogRef = this.dialog.open(ListComponent, {
          width: '450px',
          data: result.data
        });
        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            return
          }
          this.subscriptions.add(
            this.listService.updateList(result).pipe(
              tap({
                next(result) {
                },
                error(err) {
                }
              })
            ).subscribe()
          )
        });
      })
    ).subscribe());

  }
  openEditDialog(listId: string): void {
    this.subscriptions.add(this.listService.getList(listId).pipe(
      tap(result => {
        const dialogRef = this.dialog.open(ListEditComponent, {
          width: '450px',
          data: result.data
        });
        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            return
          }
          this.subscriptions.add(
            this.listService.updateList(result).pipe(
              tap({
                next(result) {
                },
                error(err) {
                }
              })
            ).subscribe()
          )
        });
      })
    ).subscribe());
  }
}
