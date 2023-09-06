const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Créer une présentation épique' },
        'task-2': { id: 'task-2', content: 'Planifier une aventure mystérieuse' },
        'task-3': { id: 'task-3', content: 'Conquérir le monde (virtuellement)' },
        'task-4': { id: 'task-4', content: 'Résoudre des énigmes impossibles' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'À faire',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        }
    },
    columnOrder: ['column-1'],
}

export default initialData;