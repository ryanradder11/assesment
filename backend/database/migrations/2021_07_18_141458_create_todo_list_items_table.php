<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodoListItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todo_list_items', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name");
            $table->boolean('completed')->default(false);
            $table->timestamps();
            $table->integer('todo_list_id')->unsigned();
            $table->foreign('todo_list_id')->references('id')->on('todo_lists')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todo_list_items');
    }
}
