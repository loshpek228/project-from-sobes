import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleImportant, editTask, saveTask, cancelEdit, setFilter, toggleCompleted } from './redux/ToDoList';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState({});
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (input.trim()) {
      dispatch(addTask(input));
      setInput('');
    }
  };

  const handleEditChange = (id, text) => {
    setEditInput({ ...editInput, [id]: text });
  };

  const filteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      case 'important':
        return tasks.filter(task => task.isImportant);
      default:
        return tasks;
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">To-Do List</h1>
      <div className="add-task-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-task-button">➕</button>
      </div>
      <div className="filters-container">
        <button onClick={() => dispatch(setFilter('all'))} className={`filter-button ${filter === 'all' ? 'active' : ''}`}>All</button>
        <button onClick={() => dispatch(setFilter('active'))} className={`filter-button ${filter === 'active' ? 'active' : ''}`}>Active</button>
        <button onClick={() => dispatch(setFilter('completed'))} className={`filter-button ${filter === 'completed' ? 'active' : ''}`}>Completed</button>
        <button onClick={() => dispatch(setFilter('important'))} className={`filter-button ${filter === 'important' ? 'active' : ''}`}>Important</button>
      </div>
      <ul className="task-list">
        {filteredTasks().map(task => (
          <li key={task.id} className={`task-item ${task.isImportant ? 'important' : ''}`}>
            {task.isEditing ? (
              <div className="edit-task-container">
                <input
                  type="text"
                  value={editInput[task.id] || task.text}
                  onChange={(e) => handleEditChange(task.id, e.target.value)}
                  className="edit-task-input"
                />
                <button onClick={() => dispatch(saveTask({ id: task.id, text: editInput[task.id] || task.text }))} className="save-button">Save</button>
                <button onClick={() => dispatch(cancelEdit(task.id))} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => dispatch(toggleCompleted(task.id))}
                  className="task-checkbox"
                />
                <span className={`task-text ${task.isCompleted ? 'completed' : ''}`}>{task.text}</span>
                <div className="task-actions">
                  <button onClick={() => dispatch(toggleImportant(task.id))} className={`important-button ${task.isImportant ? 'active' : ''}`}>
                    {task.isImportant ? 'Unmark Important' : 'Mark Important'}
                  </button>
                  <button onClick={() => dispatch(editTask(task.id))} className="edit-button">Edit</button>
                  <button onClick={() => dispatch(deleteTask(task.id))} className="delete-button">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
