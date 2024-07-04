import { configureStore } from '@reduxjs/toolkit';
import ToDoListReducer from './ToDoList'; 

const store = configureStore({
  reducer: {
    tasks: ToDoListReducer,
  },
});

export default store;
