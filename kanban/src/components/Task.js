import React from 'react';
import { useDrag } from 'react-dnd';

function Task({ task, moveTask }) {
    // Configure o arrastar para a tarefa
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: {
            id: task.id, // O identificador da tarefa
            status: task.status, // O status atual da tarefa
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Defina o estilo para a tarefa arrastada
    const taskStyle = {
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom: '8px',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    };

    // Renderize o card da tarefa
    return (
        <div ref={drag} style={taskStyle}>
            <h4>{task.title}</h4>
            {/* Outros detalhes da tarefa podem ser exibidos aqui */}
        </div>
    );
}

export default Task;