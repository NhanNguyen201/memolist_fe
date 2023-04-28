import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';

const CustomModal = ({ isBorder, isIconButton, visibleEl, modalEl }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {isIconButton ? <IconButton onClick={handleOpen} >{visibleEl}</IconButton> 
                : <Button onClick={handleOpen}  variant={isBorder ? "outlined" : "text"}>{visibleEl}</Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                {modalEl}
            </Dialog>
        </div>
    )
}

export default CustomModal
