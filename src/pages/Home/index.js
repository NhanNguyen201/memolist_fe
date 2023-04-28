import {  useState } from 'react';
import { Container, Grow, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useGetAllPosts } from '../../utils/hooks/useApiCall';
import Posts from '../../components/Posts/Posts';
import PostDialog from '../../components/PostDialog/PostDialog';
import Paginate from '../../components/Posts/Paginate/Paginate';
import useStyles from './styles';

const useQuery = () => new URLSearchParams(useLocation().search)

function Home() {
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1;
    const { authenticated } = useSelector(state => state.auth);
    const [searchTerm, setSearchTerm] = useState("")
    const { isLoading, error } = useGetAllPosts(page);
    const handleKeyPress = (e) => {
      if(e.which === 13){
        if(searchTerm.trim()){
          history.push(`/search?q=top&term=${encodeURIComponent(searchTerm.trim())}`)
        }
      }
    }
    
    return (
      <Grow in>
        <Container className={classes.pageContainer} maxWidth="lg">
            <TextField 
              fullWidth
              name="search"
              variant="outlined"
              label="Search"
              onKeyPress={handleKeyPress}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{marginTop: 20}}
            />
          {authenticated && <PostDialog/>}
          <Posts isLoading={isLoading} error={error}/> 
          {(!isLoading && !error) && <Paginate/>} 
        </Container>
      </Grow>
    )
}

export default Home
