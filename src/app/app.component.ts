import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

export interface Todo {
  id?: string;
  completed: boolean;
  title: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  okButtonText = 'Crear Tarea';
  

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('items');
    this.items = this.itemsRef.snapshotChanges();
  }

  ngOnInit() {
  }

  todoDialog(key: string = null,todo = null) {
    this.okButtonText = 'Crear Tarea';
    this.fieldValue = '';
    if (key) {
      this.editingTodo = {id:"",title:"",completed:false};
      this.editingTodo.id = key;
      this.editingTodo.title= todo;
      console.log("id:" + key + " todo: " + todo);
      this.fieldValue = todo;
      this.okButtonText = 'Editar';
    }
    this.showDialog = true;
  }

  remove(key: string) {
    this.itemsRef.remove(key); 
  }

  editTodo(title) {
    this.editingTodo.title = title;
    this.itemsRef.update(this.editingTodo.id, {title: this.editingTodo.title, completed: false});
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
