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
  const [columnOrder, setColumnOrder] = useState(initialDatas.columnOrder);

  useEffect(() => {
    const columnData = columnOrder.map((columnId) => {
      const column = initialDatas.columns[columnId];
      const tasks = column.taskIds.map((taskId) => initialDatas.tasks[taskId]);
      return { column, tasks };
    });
    setColumns(columnData);
  }, [columnOrder, initialDatas]);

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

      // Tri des tâches en fonction de newTaskIds
      const newStartTasks = newTaskIds.map((taskId) =>
        initialDatas.tasks[taskId]
      );

      // Mettre à jour la colonne de départ avec les nouvelles tâches et les nouvelles taskIds
      const newStartColumn = {
        ...start,
        column: {
          ...start.column,
          taskIds: newTaskIds,
        },
        tasks: newStartTasks,
      };

      // Mettre à jour le tableau des colonnes
      const newColumns = columns.map((col) => {
        if (col.column.id === newStartColumn.column.id) {
          return newStartColumn;
        }
        return col;
      });

      setColumns(newColumns)
      return;
    }

    // if (start === finish) {
    //   // Créer un nouvel ensemble de tâches avec l'ordre mis à jour
    //   const newTaskIds = Array.from(start.column.taskIds)
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);


    //   // Mettre à jour la colonne de départ avec les nouvelles taskIds
    //   const removedTaskId = start.column.taskIds[source.index];
    //   const removedTask = initialDatas.tasks[removedTaskId];

    //   // Filtrer les tâches de la colonne de départ pour exclure removedTask
    //   const newStartTasks = newTaskIds.map((taskId) => {
    //     const task = initialData.tasks[taskId];
    //     return task;
    //   });

    //   // Mettre à jour la colonne de départ avec les nouvelles tâches et les nouvelles taskIds
    //   const newStartColumn = {
    //     ...start,
    //     column: {
    //       ...start.column,
    //       taskIds: newTaskIds,
    //     },
    //   };
    //   // Mettre à jour le tableau des colonnes
    //   const newColumns = columns.map((col) => {
    //     if (col.column.id === newStartColumn.column.id) {
    //       return newStartColumn;
    //     }
    //     return col;
    //   });
    //   setColumns(newColumns)

    //   // const modifiedData = {
    //   //   ...initialDatas,
    //   //   columns: {
    //   //     ...initialDatas.columns,
    //   //     [start.column.id]: {
    //   //       ...start.column,
    //   //       taskIds: newTaskIds,
    //   //     },
    //   //   },
    //   // };

    //   // console.log(initialDatas);
    //   // setInitialDatas(modifiedData)
    //   // console.log(modifiedData);
    // }

    // Déplacer les tâches d'une liste à l'autre
    const startTaskIds = Array.from(start.column.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.column.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    // Mettre à jour la colonne de départ avec les nouvelles taskIds
    const removedTaskId = start.column.taskIds[source.index];
    const removedTask = initialDatas.tasks[removedTaskId];

    // Filtrer les tâches de la colonne de départ pour exclure removedTask
    const newStartTasks = start.column.taskIds
      .filter(taskId => taskId !== removedTaskId)
      .map(taskId => initialDatas.tasks[taskId]);



    // Mettre à jour la colonne de départ avec les nouvelles taskIds et tâches
    const newStartColumn = {
      ...start,
      column: {
        ...start.column,
        taskIds: startTaskIds,
      },
      tasks: newStartTasks,
    };

    // Mettre à jour la colonne d'arrivée avec les nouvelles taskIds et ajouter la tâche retirée
    const newFinishColumn = {
      ...finish,
      column: {
        ...finish.column,
        taskIds: finishTaskIds,
      },
      tasks: [...finish.tasks, removedTask],
    };

    // Mettre à jour le tableau des colonnes
    const newColumns = columns.map((col) => {
      if (col.column.id === newStartColumn.column.id) {
        return newStartColumn;
      }
      if (col.column.id === newFinishColumn.column.id) {
        return newFinishColumn;
      }
      return col;
    });
    setColumns(newColumns);

    const modifiedData = {
      ...initialDatas,
      columns: newColumns.reduce((acc, column) => {
        acc[column.column.id] = column.column;
        return acc;
      }, {}),
    };
    setInitialDatas(modifiedData)
  };

  const handleAddNewTask = (columnId) => {
    // Clônez l'état actuel des données initiales ou modifiées
    const newModifiedDatas = { ...initialDatas };
    newModifiedDatas.columnOrder = columnOrder;

    // Générez un nouvel ID pour la tâche
    const newTaskId = `task-${Object.keys(newModifiedDatas.tasks).length + 1}`;

    // Créez une nouvelle tâche
    const newTask = {
      id: newTaskId,
      title: 'Nouvelle tâche' + Math.random(0, 100),
      content: 'Description de la nouvelle tâche',
    };

    // Ajoutez la nouvelle tâche à la liste des tâches
    newModifiedDatas.tasks[newTaskId] = newTask;

    // Ajoutez également l'ID de la nouvelle tâche à la liste des tâches de la colonne spécifiée
    newModifiedDatas.columns[columnId].taskIds.push(newTaskId);

    // Mettez à jour l'état de l'application avec les nouvelles données
    setInitialDatas(newModifiedDatas);
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
                handleAddNewTask={handleAddNewTask}
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
