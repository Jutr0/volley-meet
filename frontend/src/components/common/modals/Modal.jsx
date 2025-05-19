import React from 'react';
import {Dialog, DialogContent, DialogDivider, DialogFooter, DialogHeader, DialogTitle} from '../../ui/dialog';
import {Button} from '../../ui/button';

const Modal = ({
                   open,
                   onClose,
                   title,
                   children,
                   actions,
                   submitText = 'Save',
                   onSubmit,
                   submitDisabled = false,
                   cancelText = 'Cancel',
                   size = 'lg',
                   hideActions = false
               }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    };

    const sizeClassMap = {
        xs: 'sm:max-w-xs',
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl'
    };

    const sizeClass = sizeClassMap[size] || 'sm:max-w-lg';

    return (
        <Dialog open={open} onOpenChange={open => !open && onClose()}>
            <DialogContent
                className={sizeClass}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <DialogDivider/>

                <div>
                    {children}
                </div>
                <DialogDivider/>
                {!hideActions && (
                    <DialogFooter>
                        {actions ? (
                            actions
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="mr-2"
                                >
                                    {cancelText}
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={submitDisabled}
                                >
                                    {submitText}
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
