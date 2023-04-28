import { useState } from 'react'
import { useSelector } from 'react-redux'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { FacebookSelector } from 'react-reactions';

import useStyle from './styles';

function mapIcon(icon){
    switch(icon){
        case 'like': return "👍";
        case 'love': return "❤️";
        case 'haha': return "😂";
        case 'wow': return "😯";
        case 'sad': return "😢";
        case 'angry': return "😡";
        default: return "👍"
    }
}

export default function LikeButton({handleSelectEmoji, reactions, outlined}) {
    const classes = useStyle()
    const { authenticated, userData } = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleReaction = (emoji) => {
        setAnchorEl(null)
        handleSelectEmoji(emoji)
    }
    let likeMarkup = (authenticated && userData && reactions.find(reaction => reaction.userId === userData.userId)) ? `${mapIcon(reactions.find(reaction => reaction.userId === userData.userId).emoji)} ${reactions.find(reaction => reaction.userId === userData.userId).emoji}`: "like it !"
    return (
        <div>
            <Button 
                onMouseEnter={handlePopoverOpen}
                variant={outlined ? "outlined" : "text"}
                color="primary"
            >
                {likeMarkup}
            </Button>
            <Popover
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                classes={{
                    paper: classes.popoverPaper
                }}
                onClose={handlePopoverClose}
            >
                <FacebookSelector onSelect={handleReaction}/>
            </Popover>
        </div>
    );
}
