import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
display: flex;
flex-direction: column;
padding : 1rem;
&:hover {
    border-width: 2px; /* Augmentez la largeur de la bordure en survolant */
  }
&.dragging {
  background-color: #ebdfac;
}
`;

const TaskContainer = styled.div`
flex-grow: 1;
`;

const TaskContent = styled.div`
  display: flex; /* Pour aligner le titre et le contenu horizontalement */
  justify-content: space-between; /* Pour espacer le titre et l'icône à droite */
  align-items: center;
  width: 100%;
  & i{
    cursor:grab;
    margin-top: 5px;
    font-size: 2rem;
    color: #212E53;
    transform: scale(1);
    transition: color 0.4s ease, transform 0.4s ease;
    &:hover {
        color: #212E53;
        transform: scale(1.1); /* Applique un effet de zoom au survol */
      }
    &.dragging {
        color:white;
        border-radius:50%;
        transform: scale(1.5);
      }
}
`;

const TitleH3 = styled.h3`
padding-bottom: 5px;
font-size: 1.1rem;
color: #212E53;
margin:0;
`;

const TitleH4 = styled.h4`
padding-top: 5px;
color: #4A919E;
font-size:1rem;
margin 0;
`;

const TaskBorder = styled.div`
display:flex;
justify-content: flex-end;
align-items: flex-end;
padding-bottom: 1rem;
border-bottom: 1px solid #212E53;
width: 100%;
bottom: -15px;
& i {
    font-size:1rem;
    margin-right:.1rem;
    transition: transform 0.4s ease;
    transform: scale(1);
}
& i.fa-pen{
    color : #4A919E;
    margin-right:.5rem;
    &.dragging{
        transition: transform 0.4s ease;
        transform: scale(0);
    }
}
& i.fa-trash{
    color : #CE6A6B;
    &.dragging{
        transition: transform 0.4s ease;
        transform: scale(0);
    }
}
`;

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <>
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={snapshot.isDragging ? 'dragging' : ''}
                    >
                        <TaskContent>
                            <TaskContainer>
                                <TitleH3>{task.title}</TitleH3>
                                <TitleH4>{task.content}</TitleH4>
                            </TaskContainer>
                            <i {...provided.dragHandleProps} className={snapshot.isDragging ? 'fa-solid fa-arrows-up-down-left-right dragging' : 'fa-solid fa-arrows-up-down-left-right'} />
                        </TaskContent>
                        <TaskBorder>
                            <i className={snapshot.isDragging ? 'fa-solid fa-pen dragging' : 'fa-solid fa-pen'} />
                            <i className={snapshot.isDragging ? 'fa-solid fa-trash dragging' : 'fa-solid fa-trash'} />
                        </TaskBorder>
                    </Container>
                </>
            )}
        </Draggable>
    );
};

export default Task;