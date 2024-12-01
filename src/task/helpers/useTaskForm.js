import { useState, useEffect } from 'react';

const useTaskForm = (task) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: 'Низкий',
        status: 'Нужно сделать',
        team: '',
        author: 'автор',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                deadline: task.deadline || '',
                priority: task.priority || 'Низкий',
                status: task.status || 'Нужно сделать',
                team: task.team || '',
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
