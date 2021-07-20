import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {List} from "../models/list";
import {ApiHttpService} from "./api-http.service";
import {ApiEndpointsService} from "./api-endpoint.service";
import {tap} from "rxjs/operators";
import {ListItem} from "../models/listItem";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  _lists = new BehaviorSubject<Array<List>>([])

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {
  }

  getListsAsObersable(): Observable<Array<List>> {
    return this._lists;
  }

  getList(id: string): Observable<{ data: List }> {
    return this.apiHttpService.get(this.apiEndpointsService.getListUrlByIdEndpoint(id));
  }

  getLists() {
    return this.apiHttpService.get(this.apiEndpointsService.getListUrl()).pipe(
      tap({
          next: (lists: { 'data': Array<List> }) => {
            this._lists.next(lists.data);
          },
          error: err => {
            console.error(err);
          }
        },
      )
    )
  }

  addList(listName: string) {
    return this.apiHttpService.post(this.apiEndpointsService.getListUrl(), {name: listName}).pipe(
      tap({
        next: (list: { data: List }) => {
          this._lists.value.push(list.data);
        },
        error: err => {
          console.error(err);
        },
      }))
  }

  deleteListItem(list: List, listItem: ListItem) {
    const url = this.apiEndpointsService.getItemUrlByListIdAndListItemIdEndpoint(list.id, listItem.id);
    return this.apiHttpService.delete(url).pipe(
    );
  }

  deleteList(id: string) {
    const url = this.apiEndpointsService.getListUrlByIdEndpoint(id);
    return this.apiHttpService.delete(url).pipe(
      tap({
        next: () => {
          const listToDelete = this._lists.value.find(l => l.id === id);
          this._lists.value.forEach((list, index) => {
            if (listToDelete === list) this._lists.value.splice(index, 1);
          });
          console.log('deleted');
        },
        error: err => {
          console.error(err);
        },
      }))
  }

  updateList(list: List) {
    return this.apiHttpService.patch(this.apiEndpointsService.getListUrlByIdEndpoint(list.id), list).pipe(
      tap({
          next: () => {
            const todoListId = this._lists.value.findIndex(l => (l.id === list.id));
            this._lists.value[todoListId] = list;
          },
          error: () => {
          }
        }
      )
    )
  }

  addItemToList(list: List, listItemName: string) {
    return this.apiHttpService.post(this.apiEndpointsService.getListUrlByIdEndpoint(list.id), {name: listItemName}).pipe(
      tap((result: { data: ListItem }) => {
        list.items.push(result.data);
      })
    );
  }

  updateTodoItem(list: List, listItem: ListItem) {
    const url = this.apiEndpointsService.getItemUrlByListIdAndListItemIdEndpoint(list.id, listItem.id);
    return this.apiHttpService.patch(url, listItem);
  }

}
