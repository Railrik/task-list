import React, { useEffect, useState } from 'react';
import 'reset-css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data/inital-data';
import Column from './column';

const App = () => {
  // État initial de l'application
  const [initialDatas, setInitialDatas] = useState(initialData);
  const [columns, setColumns] = useState([]); // Utilisation d'un tableau pour stocker les colonnes et les tâches

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Trouver la colonne mise à jour en fonction de la source de glisser-déposer
    const updatedColumn = columns.find((col) => col.column.id === source.droppableId);

    // Créer un nouvel ensemble de tâches avec l'ordre mis à jour
    const newTaskIds = Array.from(updatedColumn.column.taskIds)
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    // Créer une nouvelle colonne mise à jour
    const newColumn = {
      ...updatedColumn,
      column: {
        ...updatedColumn.column,
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Mapper sur les colonnes pour afficher chaque colonne et ses tâches */}
      {columns.map((data) => {
        {/* Afficher les données en fonction du nouvel ordre onDragEnd */ }
        const sortedTasks = data.column.taskIds.map((taskId) => initialDatas.tasks[taskId]);
        return <Column key={data.column.id} column={data.column} tasks={sortedTasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
