import { useState, useEffect } from 'react';

const useTaskForm = (task) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_end: '',
        priority: 'Низкий',
        status: 'Нужно сделать',
        command: '',  // Теперь это строка, а не ID
        author: 'автор',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                deadline: task.date_end || '',
                priority: task.priority || 'Низкий',
                status: task.status || 'Нужно сделать',
                team: task.command || '',  // Теперь это строка, а не ID
                author: task.author || 'автор',
            });
        }
    }, [task]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return { formData, setFormData, handleInputChange };
};

export default useTaskForm;
