import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import { TaskProvider } from './components/TaskContext';


function App() {
  return (
    <div>
      <h1>Quadro Kanban</h1>
      <TaskProvider>
            <KanbanBoard />
        </TaskProvider>
    </div>
  );
}

export default App;