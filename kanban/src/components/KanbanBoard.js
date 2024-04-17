import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';
import Column from './Column';
import './styles/KanbanBoard.css';

function KanbanBoard() {
    const { tasksByStatus, moveTask } = useContext(TaskContext);

    return (
        <div className="kanban-board">
            <Column
                status="A fazer"
                tasks={tasksByStatus['A fazer']}
                moveTask={moveTask}
            />
            <Column
                status="Em andamento"
                tasks={tasksByStatus['Em andamento']}
                moveTask={moveTask}
            />
            <Column
                status="Concluído"
                tasks={tasksByStatus['Concluído']}
                moveTask={moveTask}
            />
        </div>
    );
}

export default KanbanBoard;