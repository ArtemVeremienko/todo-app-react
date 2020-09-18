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
    term: '',
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

  search(items, term) {
    if (!term) return items;
    return items.filter(item => item.label.toLowerCase().includes(term.toLowerCase()))
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  render() {
    const { todoData, term } = this.state;
    const doneCount = todoData
      .filter(i => i.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.search(todoData, term);

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};

export default App;