const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Préparer une aventure spatiale',
            content: 'Planifier une mission pour explorer des planètes lointaines.'
        },
        'task-2': {
            id: 'task-2',
            title: 'Devenir un maître du code',
            content: 'Résoudre des énigmes de programmation complexes pour perfectionner vos compétences.'
        },
        'task-3': {
            id: 'task-3',
            title: 'Créer une œuvre d\'art magnifique',
            content: 'Utiliser votre créativité pour produire une pièce artistique exceptionnelle.'
        },
        'task-4': {
            id: 'task-4',
            title: 'Organiser une fête inoubliable',
            content: 'Préparer une fête qui laissera tout le monde sans voix.'
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'À faire',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'column-2': {
            id: 'column-2',
            title: 'En cours',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Terminé',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default initialData;
