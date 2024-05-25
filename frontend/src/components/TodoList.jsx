
import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Filter from './Filter';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      if (newTodo.trim()) {
        const response = await axios.post('http://localhost:5000/todos', { text: newTodo, status: 'incomplete' });
        setTodos([...todos, response.data]);
        setNewTodo('');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, { status });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filterTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.status === 'completed');
      case 'incomplete':
        return todos.filter(todo => todo.status === 'incomplete');
      default:
        return todos;
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <Filter setFilter={setFilter} />
      {filterTodos().map(todo => (
        <Todo
          key={todo._id}
          todo={todo}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
         
        />
      ))}
    </div>
  );
};

export default TodoList;


