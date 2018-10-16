import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TodoStoreService, Todo} from './todo-store.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SortByPriorityPipe} from './sort-by-priority.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  todoStore: TodoStoreService;
  newTodoText = '';
  today: Date = new Date();
  newTodoDate = {
	  year:null,
	  month:null,
	  day:null
  };
  newTodoPriority: Number;
  year:any;
  Day:any;
  Month:any;

	constructor(todoStore: TodoStoreService) {
		this.todoStore = todoStore;
    this.newTodoDate = {day: this.today.getDate(), month: this.today.getMonth(), year: this.today.getFullYear() };
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
      console.log(this.newTodoDate);
      let pushDate = new Date(this.newTodoDate.year, this.newTodoDate.month,this.newTodoDate.day);
      console.log(pushDate);
			this.todoStore.add(this.newTodoText, pushDate, this.newTodoPriority);
			this.newTodoText = '';
      this.newTodoDate = {
		year:null,
		month:null,
		day:null
	};
      this.newTodoPriority = 0;

		}
	}
}
