import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  todoList: any = [];
  okButtonText = 'Crear Tarea';

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('items');
    this.items = this.itemsRef.snapshotChanges();
  }

  ngOnInit() {
  }

  todoDialog(key: string,todo = null) {
    this.okButtonText = 'Crear Tarea';
    this.fieldValue = '';
    this.editingTodo = todo;
    if (todo) {
      this.fieldValue = todo.title;
      this.itemsRef.update(key, {title: todo.title, completed: todo.completed});
      this.okButtonText = 'Editar';
    }
    this.showDialog = true;
  }

  remove(key: string) {
    this.itemsRef.remove(key); 
  }

  editTodo(title) {
    this.editingTodo.title = title;
  }

  updateTodo(title) {
    if (title) {
      title = title.trim();
      if (this.editingTodo) {
        this.editTodo(title);
      } else {
        this.addTodo(title);
      }
    }
    this.hideDialog();
  }

  addTodo(title) {
    const todo = {title: title, completed: false};
    this.itemsRef.push(todo);
  }

  hideDialog() {
    this.showDialog = false;
    this.editingTodo = null;
    this.fieldValue = null; // make sure Input is new
  }

}
