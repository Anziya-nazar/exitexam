
import React from 'react';

const Todo = ({ todo, updateStatus, deleteTodo }) => {
  const handleChange = (e) => {
    updateStatus(todo._id, e.target.value);
  };

  return (
    <div className="todo">
      <div>
        <input 
          type="checkbox" 
          checked={todo.status === 'completed'}
          onChange={() => updateStatus(todo._id, todo.status === 'completed' ? 'incomplete' : 'completed')}
        />
        <span style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
};

export default Todo;




