import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';

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
          <div style={{marginTop: 10}}>{children}</div>
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

const LikeList = ({reactions}) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [tabs, setTabs] = useState({})
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        let reactionsTabs = reactions.reduce((tabs, i) => {
            const emoji = i.emoji;
            if(tabs[emoji] == null) tabs[emoji] = [];
            tabs[emoji].push(i)
            return tabs
        }, {})
        setTabs(reactionsTabs)
    }, [reactions])
    return (
        <Container className={classes.likeListContainer} >
            <Paper elevation={0} variant="outlined" square style={{border: "none"}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="user tabs"
                >

                    {reactions.length === 0 ? <Tab 
                        label={0} 
                        icon={mapIcon('like')} 
                        aria-label="Like" {...a11yProps(0)}
                    /> : (
                        Object.entries(tabs).map((eachEntry) => <Tab 
                            key={eachEntry[0]}
                            label={eachEntry[1].length} 
                            icon={mapIcon(eachEntry[0])} 
                            aria-label="Like" {...a11yProps(0)}
                    />)
                    )}
                </Tabs>
            </Paper>
            {reactions.length === 0 ? <TabPanel 
                value={value} 
                index={0}
            >
                <Typography variant="subtitle1" className={classes.itemPaper}>There is no like</Typography>
            </TabPanel> : (
                Object.entries(tabs).map((eachEntry, index) => <TabPanel 
                    value={value} 
                    index={index}
                    key={index}
                >
                    {eachEntry[1].map((user) => <Paper
                        elevation={3}
                        className={classes.itemPaper}
                        key={user.userId}
                    >
                        <Avatar src={user.userImage} className={classes.itemAvatar}/>
                        <Typography variant="body1" className={classes.itemBioName} component={Link} to={`/users/${user.userId}`}>{user.userBioName}</Typography>
                    </Paper>)}    
                </TabPanel>)
            )}
        </Container>
    )
}

export default LikeList
