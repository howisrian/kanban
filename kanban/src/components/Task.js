import React from 'react';
import { useDrag } from 'react-dnd';
import { ITEM_TYPE } from './ItemTypes'; // Importe a definição de ItemTypes de um arquivo separado
import './styles/Task.css'; // Importe o arquivo de estilos para a tarefa

function Task({ task }) {
    // Use o hook useDrag para permitir arrastar a tarefa
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { id: task.id }, // Passa o ID da tarefa para a função de drop
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag} // Atribua o ref de arrastar ao elemento div
            className={`task ${isDragging ? 'is-dragging' : ''}`}
        >
            <h4>{task.title}</h4>
        </div>
    );
}


export default Task;
