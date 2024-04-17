import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

function Column({ status, tasks, moveTask }) {
    // Configure a área de drop para aceitar itens de tipo 'TASK'
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            // Chame moveTask para mover a tarefa para a nova coluna
            moveTask(item.id, status);
        },
    });

    return (
        <div ref={drop} className="column">
            <h3>{status}</h3>
            {/* Renderize cada tarefa na coluna usando o componente Task */}
            {tasks.map(task => (
                <Task key={task.id} task={task} moveTask={moveTask} />
            ))}
        </div>
    );
}

export default Column;