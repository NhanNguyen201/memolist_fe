import { Paper, Typography } from '@material-ui/core';
import PostContainer from './PostContainer/PostContainer';
import UserContainer from './UserContainer/UserContainer';

const SearchContainer = ({result, searchTerm}) =>  {
    return (result.posts?.posts.length > 0 || result.users?.users.length > 0) 
    ? (
        <>
            {result.users?.users.length > 0 && <UserContainer users={result.users} searchTerm={searchTerm} />}
            {result.posts?.posts.length > 0 && <PostContainer posts={result.posts} searchTerm={searchTerm} />}
        </>
    ) : (
        <Paper variant="outlined" style={{padding: 20}}>
            <Typography variant="body1">Not found</Typography>
        </Paper>
    )
}


export default SearchContainer
