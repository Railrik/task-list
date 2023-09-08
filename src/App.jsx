import React, { memo, useEffect, useState } from 'react';
import 'reset-css';
import styled from 'styled-components';
import './global.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './data/inital-data';
import Column from './Column';

const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content: center;
`;

const App = () => {
  // État initial de l'application
  const [initialDatas, setInitialDatas] = useState(initialData);
  const [columns, setColumns] = useState([]); // Utilisation d'un tableau pour stocker les colonnes et les tâches
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

  useEffect(() => {
    // Utilisation de Object.keys() pour obtenir un tableau d'identifiants de colonnes
    const columnIds = Object.keys(initialDatas.columns);

    // Map sur les identifiants de colonnes et crée un tableau d'objets contenant des colonnes et des tâches
    const columnData = columnIds.map((columnId) => {
      const column = initialDatas.columns[columnId];
      const tasks = column.taskIds.map((taskId) => initialDatas.tasks[taskId]);
      return { column, tasks };
    });

    // Mettre à jour l'état des colonnes avec le tableau de données de colonnes
    setColumns(columnData);

  }, [initialDatas]);

  const onDragStart = () => {
    //document.body.style.backgroundColor = '#4A919E';
    //document.body.style.transition = 'background-color 0.4 ease';
  }

  const onDragUpdate = (update) => {
    const { source, destination, type } = update;
    if (type === 'task') {
      if (!destination) {
        const columnElement = document.querySelector(`[data-rbd-droppable-id="${source.droppableId}"]`);
        if (columnElement) {
          columnElement.style.backgroundColor = '';
        }
        return;
      }

      if (destination) {
        if (
          destination.droppableId !== source.droppableId
        ) {
          const columnElement = document.querySelector(`[data-rbd-droppable-id="${source.droppableId}"]`);
          if (columnElement) {
            columnElement.style.backgroundColor = '#EBACAE';
          }
        } else {
          const columnElement = document.querySelector(`[data-rbd-droppable-id="${source.droppableId}"]`);
          if (columnElement) {
            columnElement.style.backgroundColor = '#BED3C3';
          }
        }
      }
    }


    // const opacity = destination
    //   ? destination.index / Object.keys(initialDatas.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153,141,215,${opacity})`;
  }

  const onDragEnd = (result) => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      const columnElement = document.querySelector(`[data-rbd-droppable-id="${source.droppableId}"]`);
      if (columnElement) {
        columnElement.style.backgroundColor = '';
      }
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      const columnElement = document.querySelector(`[data-rbd-droppable-id="${source.droppableId}"]`);
      if (columnElement) {
        columnElement.style.backgroundColor = '';
      }
      return;
    }

    const columnElement = document.querySelector(`[data-rbd-droppable-id="${source.droppableId}"]`);
    if (columnElement) {
      columnElement.style.backgroundColor = '';
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);

      // Mettre à jour les colonnes en fonction de la nouvelle commande de colonnes
      const newColumnsData = newColumnOrder.map((columnId) => {
        const column = columns.find((col) => col.column.id === columnId);
        return { ...column, tasks: column.tasks };
      });
      setColumns(newColumnsData);
      return;
    }

    // Trouver la colonne mise à jour en fonction de la source de glisser-déposer
    const start = columns.find((col) => col.column.id === source.droppableId);
    const finish = columns.find((col) => col.column.id === destination.droppableId);

    if (start === finish) {
      // Créer un nouvel ensemble de tâches avec l'ordre mis à jour
      const newTaskIds = Array.from(start.column.taskIds)
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      // Créer une nouvelle colonne mise à jour
      const newColumn = {
        ...start,
        column: {
          ...start.column,
          taskIds: newTaskIds,
        },
      };

      // Mettre à jour le tableau des colonnes
      const newColumns = columns.map((col) => {
        if (col.column.id === newColumn.column.id) {
          return newColumn;
        }
        return col;
      });

      setColumns(newColumns)
      return;
    }

    //déplacer les taches d'une liste à l'autre
    const startTaskIds = Array.from(start.column.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.column.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    // Mettre à jour les colonnes
    const updatedColumns = columns.map((col) => {
      if (col.column.id === start.column.id) {
        return { ...col, column: { ...col.column, taskIds: startTaskIds } };
      }
      if (col.column.id === finish.column.id) {
        return { ...col, column: { ...col.column, taskIds: finishTaskIds } };
      }
      return col;
    });
    setColumns(updatedColumns);

  };
  return (
    <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column" >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* Mapper sur les colonnes pour afficher chaque colonne et ses tâches */}
            {columns.map((data, index) => {
              {/* Afficher les données en fonction du nouvel ordre onDragEnd */ }
              const sortedTasks = data.column.taskIds.map((taskId) => initialDatas.tasks[taskId]);
              return <Column
                key={data.column.id}
                column={data.column}
                tasks={sortedTasks}
                index={index}
              />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default memo(App);
