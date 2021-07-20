<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class todoListItem extends Model
{
    protected $fillable = [
        'name', 'completed'
    ];

    protected $hidden = ['todo_list_id'];

    public function todoList()
    {
        return $this->belongsTo(TodoList::class);
    }
}
