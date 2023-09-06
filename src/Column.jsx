import React from 'react';
import styled from 'styled-components'; // Importe styled-components pour le stylage
import { Droppable } from 'react-beautiful-dnd'; // Importe Droppable de react-beautiful-dnd pour la gestion du glisser-déposer
import Task from './Task';

// Styles pour les composants stylisés
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

const Column = ({ column, tasks }) => {
    return (
        <Container>
            <Title>{column.title}</Title>
            {/* Crée une zone de dépôt pour les tâches */}
            <Droppable droppableId={column.id}>
                {provided => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {/* Mappe les tâches pour les afficher dans la colonne */}
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder} {/* Espace réservé pour les tâches en cours de glisser-déposer */}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
};

export default Column;
