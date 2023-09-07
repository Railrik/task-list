import React, { memo } from 'react';
import styled from 'styled-components'; // Importe styled-components pour le stylage
import { Droppable, Draggable } from 'react-beautiful-dnd'; // Importe Droppable de react-beautiful-dnd pour la gestion du glisser-déposer
import Task from './Task';

// Styles pour les composants stylisés
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width:33.333%;
  background-color:white;
  display:flex;
  flex-direction:column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: white;
  transition: background-color 0.4s ease;
&.dragging-over {
  background-color: skyblue;
}
flex-grow:1;
`;

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          {/* Crée une zone de dépôt pour les tâches */}
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? 'dragging-over' : ''}

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
      )}
    </Draggable>
  );
};

export default memo(Column);
