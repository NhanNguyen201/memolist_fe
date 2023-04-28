import RoundButton from '../../../utils/RoundButton';
import { Popover, Button } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { logout } from '../../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import useStyles from './styles';
const CustomPopover = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'sign-popover' : undefined;

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            <RoundButton tip="Logout" onClick={handleClick}>
                {open ? <KeyboardArrowDownIcon color='primary'/> : <DehazeIcon color='primary'/>}
            </RoundButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popoverContainer}>
                    <Button variant="outlined" onClick={handleLogout}>Log out</Button>
                </div>
            </Popover>
        </div>
    )
}

export default CustomPopover;
