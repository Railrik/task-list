import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
margin:8px;
padding:8px;
border:1px solid lightgrey;
border-radius:2px;
margin-bottom : 8px;
background-color: white;
&.dragging {
  background-color: lightgreen;
}
`;

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={snapshot.isDragging ? 'dragging' : ''}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;