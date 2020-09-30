import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

class App extends Component {
  localStorageKey = 'todo-app-react';

  maxId = 100;

  state = {
    todoData: [],
    term: '',
    filter: 'all',
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    if (!data.length) return;
    this.maxId = data[data.length - 1].id + 1;
    this.setState({ todoData: data })
  }

  componentDidUpdate() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.todoData))
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

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(i => !i.done);
      case 'done':
        return items.filter(i => i.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData
      .filter(i => i.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.search(todoData, term);
    const filteredItems = this.filter(visibleItems, filter);

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>
        <TodoList
          todos={filteredItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};

export default App;