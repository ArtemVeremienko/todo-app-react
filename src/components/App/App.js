import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a Lunch'),
    ],
  }

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(i => i.id !== id),
    }))
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem]
    }))
  }

  toggleProperty(arr, id, propName) {
    const newArray = arr.map(i => i.id === id ? { ...i, [propName]: !i[propName] } : i);
    return { todoData: newArray }
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => this.toggleProperty(todoData, id, 'important'))
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => this.toggleProperty(todoData, id, 'done'))
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData
      .filter(i => i.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};

export default App;