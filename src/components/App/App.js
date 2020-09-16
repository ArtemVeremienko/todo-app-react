import React from 'react';
import './App.css';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';

const App = () => {
    const todoData = [
        { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Make Awesome App', important: true, id: 2 },
        { label: 'Have a Lunch', important: false, id: 3 },
    ]
    return (
        <div className="todo-app">
            <AppHeader doDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel/>
                <ItemStatusFilter/>
            </div>
            <TodoList todos={todoData} />
        </div>
    );
};

export default App;