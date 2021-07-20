<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    //
    protected $fillable = [
        'name',
    ];

    public function todoListItems()
    {
        return $this->hasMany(todoListItem::class);
    }
}
