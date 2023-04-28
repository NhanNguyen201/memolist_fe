import { AppBar, Typography,Toolbar, Container, Button, Avatar, Icon } from '@material-ui/core';

import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import Memory from '../../imgs/Memolist.png';
import useAuth from '../../utils/hooks/useAuth';
import Popover from './Popover/Popover'
import useStyles from './styles';
const Navbar = () => {
    useAuth();
    const classes = useStyles();
    const { authenticated, userData } = useSelector(state => state.auth);
    return (
        <AppBar position="sticky" color="inherit" className={classes.navBar}>
            <Toolbar>
                <Container className={classes.navBarContainer} maxWidth="xl">
                    <Icon component={Link} to={'/'} fontSize="large" style={{height: 40, width: 40}}>
                        <img src={Memory} alt="Memories"  height="40" />
                    </Icon>
                    <div>
                        <Icon component={Link} to={'/'}>
                            <HomeIcon color="primary" fontSize="large"/>
                        </Icon>
                    </div>
                    {(authenticated && userData) ? (
                        <div className={classes.navAuthContainer}>
                            <Typography variant="body1" className={classes.navAuthBioName} component={Link} to={'/user'} color='primary'>{userData.userBioName}</Typography>
                            <Avatar src={userData.userImage}/>
                            <Popover/>
                        </div>
                    ) : (
                        <Button variant='outlined' component={Link} to={'/auth'} color="primary">Sign in</Button>
                    )}
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
