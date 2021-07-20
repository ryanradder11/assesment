import {ListItem} from "./listItem";

export interface List {
  name: string,
  id: string,
  created_at?: string
  updated_at?: string
  items: Array<ListItem>
}
