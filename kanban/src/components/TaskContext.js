import React, { createContext, useState } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasksByStatus, setTasksByStatus] = useState({
        'A fazer': [],
        'Em andamento': [],
        'Concluído': [],
    });

    // Função para mover uma tarefa para um novo status
    const moveTask = (taskId, newStatus) => {
        // Copie o estado atual das tarefas
        const updatedTasksByStatus = { ...tasksByStatus };

        // Encontre a tarefa a ser movida e remova-a do status atual
        let taskToMove;
        for (const status in updatedTasksByStatus) {
            const index = updatedTasksByStatus[status].findIndex(task => task.id === taskId);
            if (index !== -1) {
                taskToMove = updatedTasksByStatus[status].splice(index, 1)[0];
                break;
            }
        }

        // Adicione a tarefa ao novo status
        if (taskToMove) {
            taskToMove.status = newStatus; // Atualize o status da tarefa
            updatedTasksByStatus[newStatus].push(taskToMove);
        }

        // Atualize o estado com as tarefas atualizadas
        setTasksByStatus(updatedTasksByStatus);
    };

    return (
        <TaskContext.Provider value={{ tasksByStatus, moveTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, TaskContext };
