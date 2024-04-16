import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';
import './styles/KanbanBoard.css';
import { ITEM_TYPE } from './ItemTypes';



function KanbanBoard() {
    const [tasksByStatus, setTasksByStatus] = useState({
        'A fazer': [],
        'Em andamento': [],
        'Concluído': []
    });

    // Carregue as tarefas da API
    useEffect(() => {
        fetch('http://127.0.0.1:3001/tasks')
            .then(response => response.json())
            .then(data => {
                console.log('Dados recebidos da API:', data);
                
                // Verifique se os dados recebidos são um objeto com a chave "tasks"
                if (data && data.tasks && Array.isArray(data.tasks)) {
                    // Agrupe as tarefas por status
                    const groupedTasks = data.tasks.reduce((acc, task) => {
                        const status = task.status || 'A fazer';
                        if (!acc[status]) {
                            acc[status] = [];
                        }
                        acc[status].push(task);
                        return acc;
                    }, {
                        'A fazer': [],
                        'Em andamento': [],
                        'Concluído': []
                    });
    
                    setTasksByStatus(groupedTasks);
                } else {
                    console.error('Dados inesperados recebidos da API:', data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
            });
    }, []);

    // Função para mover uma tarefa para um novo status
    const moveTask = (taskId, newStatus) => {
        // Encontre a tarefa a ser movida e remova-a do status atual
        let taskToMove;
        const updatedTasksByStatus = { ...tasksByStatus };
        for (const status in updatedTasksByStatus) {
            const index = updatedTasksByStatus[status].findIndex(task => task.id === taskId);
            if (index !== -1) {
                taskToMove = updatedTasksByStatus[status].splice(index, 1)[0];
                break;
            }
        }

        // Adicione a tarefa ao novo status
        if (taskToMove) {
            taskToMove.status = newStatus;
            updatedTasksByStatus[newStatus].push(taskToMove);
        }

        setTasksByStatus(updatedTasksByStatus);
    };

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

function Column({ status, tasks, moveTask }) {

    const [, drop] = useDrop({
        accept: 'TASK', // O tipo de item deve ser uma string ou símbolo
        drop: (item) => {
            moveTask(item.id, status);
        },
    });
    return (
        <div ref={drop} className="column">
            <h3>{status}</h3>
            {tasks.map(task => (
                <Task key={task.id} task={task} moveTask={moveTask} />
            ))}
        </div>
    );
}

export default KanbanBoard;
