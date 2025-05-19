import React from 'react';
import Modal from './Modal';
import Button from '../Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ConfirmationModal = ({
                               onConfirm,
                               onCancel,
                               title = "Confirm Action",
                               message,
                               item = "item",
                               confirmText = "Delete",
                               confirmColor = "error",
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
                    variant="outlined"
                    onClick={handleCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    variant="contained"
                    color={confirmColor}
                    onClick={handleConfirm}
                >
                    {confirmText}
                </Button>
            </>}
            size="xs"
        >
            <Box sx={{mb: 3}}>
                <Typography variant="body1">{message ? message : <Typography>Are you sure you want to delete <b>{item}</b>?</Typography>} </Typography>
            </Box>

        </Modal>
    );
};

export default ConfirmationModal;
