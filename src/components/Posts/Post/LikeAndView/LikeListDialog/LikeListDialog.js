import { useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { FacebookCounter } from '@charkour/react-reactions';
import LikeList from './LikeList/LikeList';

const LikeListDialog = ({ reactions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { authenticated, userData } = useSelector(state => state.auth);
    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <FacebookCounter
                counters={reactions.map(emo => ({emoji: emo.emoji, by: emo.userId}))}
                user={authenticated && userData?.userId}
                onClick={handleClickOpen} 
                counterStyle={{fontSize: 20, textTransform: "none"}}
            />
            <Dialog
                open={isOpen}
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                aria-labelledby="likeList_Dialog"
            >
                <LikeList reactions={reactions}/>
            </Dialog>
        </div>
    )
}

export default LikeListDialog
