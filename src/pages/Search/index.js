import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Grow, Paper, TextField, Typography, Divider } from '@material-ui/core';
import { useSearchAll } from '../../utils/hooks/useApiCall';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import CollectionsIcon from '@material-ui/icons/Collections';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';

import SearchContainer from '../../components/SearchContainer/SearchContainer';
import useStyles from './styles';


const useQuery = () => new URLSearchParams(useLocation().search)

const Search = () => {
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const urlSearchTerm = query.get('term');
    const urlSearchQuery = query.get('q');
    const [tabIndexValue, setTabIndexValue] = useState(() => urlSearchQuery || 'top');
    const [searchQuery, setSearchQuery] = useState(() => urlSearchQuery || 'top');
    const [tmpSearchTerm, setTmpSearchTerm] = useState(() => query.get('term') || "");
    const [searchTerm, setSearchTerm] = useState(() => query.get('term') || "");

    const { result, isLoading, error } = useSearchAll(searchQuery, urlSearchQuery, searchTerm, urlSearchTerm);
    useEffect(() => {
        if(urlSearchTerm && urlSearchTerm !== searchTerm && urlSearchTerm !== tmpSearchTerm){ 
            setSearchTerm(query.get('term'))
            setTmpSearchTerm(query.get('term'))
        }
        // eslint-disable-next-line
    }, [urlSearchTerm])
    const handleKeyPress = (e) => {
        if(e.which === 13){
            if(tmpSearchTerm.trim()){
                setSearchQuery(searchQuery);
                history.push(`/search?q=${searchQuery}&term=${encodeURIComponent(tmpSearchTerm.trim())}`)
            }
        }
    }

    const handleChangeQuery =(e, newValue) => {
        setTabIndexValue(newValue)
        setSearchQuery(newValue)
    }
    return (
        <Grow in>
            <Container maxWidth="xl" className={classes.pageContainer}>
                <Drawer
                    variant="permanent"                    
                    anchor="left"
                    classes={{
                        paper: classes.searchSideBarPaper
                    }}
                >
                    <Container maxWidth="sm">
                        <TextField 
                            fullWidth 
                            value={tmpSearchTerm}
                            onChange={e => setTmpSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            variant="outlined"
                            label="Search"
                        />
                        <Paper>
                            <Tabs
                                value={tabIndexValue}
                                onChange={handleChangeQuery}
                                orientation="vertical"
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab 
                                    value="top" 
                                    label={
                                        <div className={classes.searchTab}>
                                            <SearchIcon/>
                                            <Divider orientation="vertical" variant="middle" flexItem />
                                            <Typography variant="body1">All</Typography>
                                        </div>
                                    } 
                                />
                                <Tab 
                                    value="users" 
                                    label={
                                        <div className={classes.searchTab}>
                                            <PeopleIcon/>
                                            <Divider orientation="vertical" variant="middle" flexItem />
                                            <Typography variant="body1">Users</Typography>
                                        </div>
                                    }
                                />
                                <Tab 
                                    value="posts" 
                                    label={
                                        <div className={classes.searchTab}>
                                            <CollectionsIcon/>
                                            <Divider orientation="vertical" variant="middle" flexItem />
                                            <Typography variant="body1">Posts</Typography>
                                        </div>
                                    }
                                />
                            </Tabs>
                        </Paper>
                    </Container>
                </Drawer>
                <Container maxWidth="sm">
                    {isLoading 
                        ? <Typography variant="body1">Loading</Typography>
                        : (error 
                            ? <Typography variant="body1">{error}</Typography>
                            : (result && <SearchContainer result={result} searchTerm={searchTerm}/>)
                        )
                    }
                </Container>
            </Container>
        </Grow>
    )
}

export default Search
