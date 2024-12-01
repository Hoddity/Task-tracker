import React from 'react';

const ConfirmDialog = ({ onConfirm, onCancel, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="dimmed-background" onClick={onCancel}>
            <div className="confirm-dialog">
                <p>Удалить задачу?</p>
                <div className="confirm-buttons">
                    <button onClick={onConfirm} className="confirm-delete-button">
                        Удалить
                    </button>
                    <button onClick={onCancel} className="cancel-button">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
