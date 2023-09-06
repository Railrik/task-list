import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
margin:8px;
padding:8px;
border:1px solid lightgrey;
border-radius:2px;
margin-bottom : 8px;
background-color:white;
`;

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;