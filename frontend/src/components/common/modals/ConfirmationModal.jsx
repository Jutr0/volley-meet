import React from 'react';
import Modal from './Modal';
import {Button} from '../../ui/button';

const ConfirmationModal = ({
                               onConfirm,
                               onCancel,
                               title = "Confirm Action",
                               message,
                               item = "item",
                               confirmText = "Delete",
                               confirmColor = "destructive",
                               cancelText = "Cancel",
                               open = false
                           }) => {

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleCancel}
            title={title}
            actions={<>
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    variant={confirmColor}
                    onClick={handleConfirm}
                >
                    {confirmText}
                </Button>
            </>}
            size="md"
        >
            {message ? message :
                <span>Are you sure you want to delete <b>{item}</b>?</span>}

        </Modal>
    );
};

export default ConfirmationModal;
