<?php

namespace App\Http\Controllers;

use App\TodoList;
use App\todoListItem;
use Illuminate\Http\Request;

class TodoListItemController extends Controller
{
    function create(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|min:2|max:255',
        ]);

        $todoList = TodoList::where('id', $id)->first();
        $todoList->todoListItems()->create([
            'name' => $request->input('name')
        ]);
        $response = new \stdClass();
        $response->data = $todoList->todoListItems->last();
        return json_encode($response);
    }

    function show(Request $request, $id, $itemId){
        $todoListItem = todoListItem::where('todo_list_id', $id)->where('id', $itemId)->first();
        $response = new \stdClass();
        $response->data = $todoListItem;
        return json_encode($response);
    }

    function delete(Request $request, $id, $itemId){
        $todoListItem = todoListItem::where('todo_list_id', $id)->andwhere('id', $itemId)->first();
        $todoListItem->destroy();
        return json_encode('');
    }

    function patch(Request $request, $id, $itemId){

        $validated = $request->validate([
            'name' => 'required_without:completed|min:2|max:255',
            'completed' => 'required_without:name',
        ]);

       $todoListItem = todoListItem::where('todo_list_id', $id)->where('id', $itemId)->first();
       $todoListItem->name = $request->input('name');
       $todoListItem->completed = $request->input('completed');
       $todoListItem->save();

       $response = new \stdClass();
       $response->data = $todoListItem;
       return json_encode($response);
    }
}
