import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import PanoramaIcon from '@material-ui/icons/Panorama';
import Container from '@material-ui/core/Container'
import InfiniteScroll from "react-infinite-scroll-component";
import Post from '../Posts/Post/Post';
import StoryCard from '../StoryContainer/StoryCard/StoryCard';
import { createStory, likePost, deletePost, deleteStory } from '../../api'
import { Grid, CircularProgress, Paper, Tabs, Tab } from '@material-ui/core';

import StoryEditor from '../StoryContainer/StoryEditor/StoryEditor';

import useStyles from './styles';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{marginTop: 20}}>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



export default function PostTabs({isLoading, error, posts, hasMore, loadMoreUserPosts, stories, storyOpenId}) {
  const location = useLocation()
  const classes = useStyles();
  const [value, setValue] = useState(() => storyOpenId ? 1: 0);
  const [userPosts, setUserPosts] =  useState([]);
  const [userStories, setUserStories] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLike = async(id, emoji) => {
    try {
      const { data: newPost } = await likePost(id, { emoji: emoji });
      let newPosts = userPosts.map(post => post._id === id ? newPost : post)
      setUserPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async(id) => {
    try {
        await deletePost(id);
        let newPosts =  userPosts.filter(post => post._id !== id)
        setUserPosts(newPosts)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  const handleCreateStory = async(story) => {
    const { data: newStory } = await createStory(story);
    setUserStories([newStory,...userStories])
  }

  const handleRemoveStory = async (storyId, subStoryId) => {
    const res = await deleteStory(storyId, subStoryId);
    if(res.data.story){
      let { story } = res.data;
      let storyCopy = userStories.map(str => str._id === storyId ? story : str)
      setUserStories(storyCopy)
    } else {
      let storyCopy = userStories.filter(str => str._id !== storyId)
      setUserStories(storyCopy)
    }
  }
  useEffect(() => {
    if(posts){
      setUserPosts(posts)
    }
    if(stories){
      setUserStories(stories);
    }
  }, [posts, stories])
    
  return (
    <div >
        <Paper className={classes.tabsContainer} elevation={1}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="user tabs"
            >
                <Tab icon={<PanoramaIcon color="primary"/>} aria-label="Posts" {...a11yProps(0)} />
                <Tab icon={<FolderSpecialIcon color="primary"/>} aria-label="Special" {...a11yProps(1)} />
            </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          {isLoading ? <div style={{textAlign: "center"}}><CircularProgress/></div> 
            : (error ? (<h2>{error}</h2>) 
              : (<InfiniteScroll
                    dataLength={userPosts.length}
                    next={loadMoreUserPosts}
                    hasMore={hasMore}
                    loader={
                      <div style={{textAlign: "center", marginTop: 20}}>
                        <CircularProgress/> 
                      </div>
                    }
                    style={{
                      overflow: "visible"
                    }}
                  >
                    <Container>
                      <Grid container spacing={4}>
                          {userPosts.map(post => (
                              <Grid key={post._id} item xs={12} md={6} lg={4}>
                                  <Post post={post} handleLike={handleLike} handleDelete={handleDelete}/>
                              </Grid>
                          ))}
                      </Grid>
                    </Container>
                  </InfiniteScroll>)
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {location.pathname === '/user' && <StoryEditor createStory={handleCreateStory}/>}
          {isLoading ? <div style={{textAlign: "center"}}><CircularProgress/></div>
            : (error ? (<h2>{error}</h2>) 
              : (<Grid container spacing={4}>
                  {userStories.map(story => (
                      <Grid key={story._id} item xs={6} md={3} lg={2}>
                          <StoryCard story={story} storyOpenId={storyOpenId} handleRemoveStory={handleRemoveStory}/>
                      </Grid>
                  ))}
              </Grid>)
          )}
        </TabPanel>
    </div>
  );
}