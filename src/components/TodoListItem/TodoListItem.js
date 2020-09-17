import React, { Component } from 'react';
import './TodoListItem.css';


class TodoListItem extends Component {
  onLabelClick = () => {
    console.log(`Done: ${this.props.label}`)
  }

  render() {
    const { label, important = false } = this.props;

    const styles = {
      color: important ? 'tomato' : 'black',
      fontWeight: important ? 'bold' : 'normal',
    };

    return (
      <span className="todo-list-item">
        <span
          className="todo-list-item-label"
          style={styles}
          onClick={this.onLabelClick}>
          {label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right">
          <span className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right">
          <span className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

export default TodoListItem;