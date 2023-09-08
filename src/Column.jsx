import React, { memo, useState } from 'react';
import styled from 'styled-components'; // Importe styled-components pour le stylage
import { Droppable, Draggable } from 'react-beautiful-dnd'; // Importe Droppable de react-beautiful-dnd pour la gestion du glisser-déposer
import Task from './Task';

// Styles pour les composants stylisés
const Container = styled.div`
margin:1rem;
height:100%;
box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.2);
background-color: white;
flex: 1;
flex-basis: calc(100% / 1); /* Colonne pleine largeur sur petit écran */

@media (min-width: 768px) {
  flex-basis: calc(100% / 2); /* Colonne de la moitié de la largeur sur écran moyen */
}

@media (min-width: 992px) {
  flex-basis: calc(100% / 4); /* Colonne de 1/4 de la largeur sur grand écran */
}
`;

const Title = styled.div`
position: absolute;
bottom: 25px;
padding-left: 50px;
`;

const TitleH2 = styled.h2`
font-weight: 400;
font-size: 1.75rem;
`;

const TaskList = styled.div`
  padding: 2rem 1rem;
  background-color: white;
  transition: background-color 0.4s ease;
&.dragging-over {
  background-color: #BED3C3;
}
`;

const Header = styled.div`
height: 200px;
background: 
  linear-gradient(
    rgba(77, 52, 127, 0.85), 
    rgba(77, 52, 127, 0.85)
  ),
  url('https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ee039d16c1a1638867bb1cc95bf3b833&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
color: #fff;
position: relative;
`

const HeaderIcons = styled.div`
padding: 25px 50px;
line-height: 35px;
`

const IconLeft = styled.div`
  float: left;
  font-size: 2rem;
  color: white;
  transform: scale(1);
  transition: color 0.4s ease, transform 0.4s ease; /* Ajoutez la transition de couleur et de transformation */
  &:hover {
    color: #212E53;
    transform: scale(1.1); /* Applique un effet de zoom au survol */
  }
  &.dragging {
    color: #212E53;
    transform: scale(1.5); /* Applique un effet de zoom lors du glisser-déposer */
  }
`;

const IconRight = styled.div`
float: right;
font-size: 2.5rem;
`

const More = styled.div`
  bottom: -30px;
  right: 40px;
  position: absolute;
  background-color: #4A919E;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  text-align: center;
`

const IconPlus = styled.div`
line-height: 60px;
font-size: 2.5rem;
`

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Header>
            <HeaderIcons>
              <IconLeft {...provided.dragHandleProps} className={snapshot.isDragging ? 'dragging' : ''}><i className="fa-solid fa-arrows-up-down-left-right" /></IconLeft>
              <IconRight><i className="fa-solid fa-ellipsis" /></IconRight>

            </HeaderIcons>
            <Title><TitleH2>{column.title}</TitleH2></Title>
            <More>
              <IconPlus><i className="fa-solid fa-plus" /></IconPlus>
            </More>
          </Header>
          {/* Crée une zone de dépôt pour les tâches */}
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? 'dragging-over ' : ''}
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
