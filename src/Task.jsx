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
display:flex;
align-items:center;
`;

const Handle = styled.div`
width:20px;
height:20px;
background-color:orange;
border-radius:4px;
margin-right:8px;
cursor:grab;
`

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}

                    ref={provided.innerRef}
                    className={snapshot.isDragging ? 'dragging' : ''}
                >
                    <Handle {...provided.dragHandleProps} />
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;