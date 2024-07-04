import { createSlice } from '@reduxjs/toolkit';

const ToDoList = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: 'all'
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), text: action.payload, isImportant: false, isEditing: false, isCompleted: false });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    markAsImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isImportant = true;
      }
    },
    editTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isEditing = true;
      }
    },
    saveTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        task.isEditing = false;
      }
    },
    cancelEdit: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isEditing = false;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
  },
});

export const { addTask, deleteTask, toggleImportant, markAsImportant, editTask, saveTask, cancelEdit, setFilter, toggleCompleted } = ToDoList.actions;
export default ToDoList.reducer;
