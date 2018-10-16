import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Todo {
	completed: Boolean;
	editing: Boolean;

	private _title: String;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
  }
  
  private _dateDue: Date;
	get dateDue() {
		return this._dateDue;
	}
	set dateDue(value: Date) {
		this._dateDue = value;
  }
  
  private _priority: Number;
	get priority() {
		return this._priority;
	}
	set priority(value: Number) {
		this._priority = value;
	}

	constructor(title: String, dueDate: Date, prior: Number) {
		this.completed = false;
		this.editing = false;
    this.title = title.trim();
    this.dateDue = dueDate;
		this.priority = prior;
	}
}


export class TodoStoreService {

  todos: Array<Todo>;

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
		// Normalize back into classes
		this.todos = persistedTodos.map( (todo: {_title: String, _dateDue: String, _priority: Number, completed: Boolean}) => {
      let tempDate = new Date(""+todo._dateDue);
      let ret = new Todo(todo._title, tempDate, todo._priority);
			ret.completed = todo.completed;
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed);
		this.updateStore();
	}

	removeCompleted() {
		this.todos = this.getWithCompleted(false);
		this.updateStore();
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(todo: Todo) {
		todo.completed = !todo.completed;
		this.updateStore();
	}

	remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.updateStore();
	}

	add(title: String, newDate: Date, priority: Number) {
		this.todos.push(new Todo(title, newDate, priority));
		this.updateStore();
	}
}
