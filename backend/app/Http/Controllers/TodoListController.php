<?php

namespace App\Http\Controllers;

use App\TodoList;
use App\todoListItem;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;

class TodoListController extends Controller
{
    function showAll()
    {
        $response = new \stdClass();
        $response->data = TodoList::all();
        return json_encode($response);
    }

    function show($id){
        $response = new \stdClass();
        $todoList =  TodoList::where('id', $id)->first();
        $todoList->items = todoListItem::where('todo_list_id', $id)->get();
        $response->data = $todoList;
        return json_encode($response);
    }

    function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:2|max:255',
        ]);

        $todoList = TodoList::create([
            'name' => $request->input('name'),
        ]);

        $response = new \stdClass();
        $response->data = $todoList;
        return json_encode($response);
    }


    function patch(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|min:2|max:255',
        ]);

        $todoList = TodoList::where('id', $id)->first();
        $todoList->name = $request->input('name');
        $todoList->save();

        return json_encode($todoList);
    }


    function delete($id){
        TodoList::destroy($id);
        return json_encode('');
    }

}
