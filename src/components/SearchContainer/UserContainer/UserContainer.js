import { useState, useEffect, useCallback } from 'react';
import UserPaper from "../UserPaper/UserPaper"
import { Paper, Typography, Button } from '@material-ui/core';
import { getAllBySearch } from '../../../api'

import useStyles from './styles';
const UserContainer = ({users: {users: userListInitial, currentPage, numberOfPages}, searchTerm}) => {
    const [currentUserPage, setCurrentUserPage] = useState(() => currentPage);
    const [nextPage, setNextPage] = useState(() => (numberOfPages > 0 && currentPage < numberOfPages) ? currentPage + 1 : 0);
    const [userList, setUserList] = useState(() => userListInitial);
    
    const loadMore = useCallback(async() => {
        const { data } = await getAllBySearch('users', searchTerm, nextPage);
        setUserList(prevState => [...prevState, ...data.users.users])
        setCurrentUserPage(data.users.currentPage)
    }, [nextPage, searchTerm])

    useEffect(() => {
        if(numberOfPages > 0 && currentUserPage < numberOfPages){
            setNextPage(currentUserPage + 1)
        }
    }, [currentUserPage, numberOfPages])
    
    const classes = useStyles()
    return (
        <Paper variant="outlined" square className={classes.userContainerPaper}>
            <Typography variant="h5">Users you may find: </Typography>
            {userList.map(user => <UserPaper user={user} key={user.userId}/>)}
            {(numberOfPages > 0 && currentUserPage < numberOfPages) && (
                <div className={classes.loadMoreButton}>
                    <Button variant="outlined" onClick={loadMore}>Load more</Button>
                </div>
            )}
        </Paper>
    )
}

export default UserContainer;