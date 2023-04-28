import { useState, useEffect, useRef, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getStory, addToStory } from '../../api'
import Grow from '@material-ui/core/Grow'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip';
import 'tui-image-editor/dist/tui-image-editor.min.css';
import "tui-color-picker/dist/tui-color-picker.min.css"
import ImageEditor from '@toast-ui/react-image-editor';
import { Image } from 'cloudinary-react';
import useStyle from './styles'

import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={`${(value / 1000).toFixed(2)} seconds`}>
        {children}
      </Tooltip>
    );
}

export default function StoryEdit() {
    const classes = useStyle()
    const { storyId } = useParams();
    const editorRef = useRef(null);
    const history = useHistory();
    const [stories, setStories] = useState([])
    const [storyTimer, setStoryTimer] = useState(500);
    const [isEditSuccess, setIsEditSuccess] = useState(false);

    const [error, setError] = useState(null)
    const { authenticated, userData: authData } = useSelector(state => state.auth)

    const handleStoryTimerChange = (e, value) => {
        if(value){
            setStoryTimer(value)
        }
    }

    const handleAddStory = async () => {
        const editorInstance = editorRef.current.getInstance();
        const editorImage = editorInstance.toDataURL()
        const { data: { stories: newStory } } = await addToStory(storyId, { storyImage: editorImage, duration: storyTimer })
        setIsEditSuccess(true)
        setStories(newStory)
    }

    useEffect(() => (async() => {
        try {
            const { data } = await getStory(storyId);
            if(!authenticated || data.userId !== authData.userId) {
                history.push('/')
            }
            setStories(data.stories)
        } catch (error) {
            setError(error.response ? error.response.data.error : "Something is wrong")
            console.log(error.response ? error.response.data.error: error)
        }
        })()
        // eslint-disable-next-line
    , [ storyId ])
    
    return (
        <Grow in>
            {error 
            ?<Container maxWidth="lg">
                {error && <Typography variant="body1">{error}</Typography>}
            </Container> 
            :<Container maxWidth="lg" className={classes.pageContainer}>
                <Snackbar 
                    open={isEditSuccess}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    TransitionComponent={Transition}
                    autoHideDuration={2000} 
                    onClose={() => setIsEditSuccess(false)}
                > 
                    <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success">
                        Edit complete
                    </Alert>
                </Snackbar>
                <div className={classes.imageContainer}>
                    {stories.map(eachStory => <Paper elevation={4} className={classes.storyImagePaper} key={eachStory._id}>
                        <Image 
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME} 
                            publicId={eachStory.image.public_id} 
                            loading="lazy"
                            crop="thumb"
                            dpr="auto"
                            quality="auto"
                            height="300"
                            width="200" 
                        />
                        
                    </Paper>)} 
                </div>
                <div className={classes.editorContainerDiv}>
                    <ImageEditor
                        includeUI={{
                            theme: {
                                'menu.normalIcon.color': '#8a8a8a',
                                'menu.activeIcon.color': '#555555',
                                'menu.disabledIcon.color': '#434343',
                                'menu.hoverIcon.color': '#e9e9e9',
                                'submenu.normalIcon.color': '#8a8a8a',
                                'submenu.activeIcon.color': '#e9e9e9',
                            },
                            menu: ['shape', 'filter', 'text', 'rotate', 'flip', 'crop'],
                            initMenu: 'filter',
                            uiSize: {
                                width: '1200px',
                                height: '700px',
                            },
                            menuBarPosition: 'bottom',
                        }}
                        ref={editorRef}
                        cssMaxHeight={700}
                        cssMaxWidth={1200}
                        selectionStyle={{
                            cornerSize: 10,
                            rotatingPointOffset: 70,
                        }}
                        usageStatistics={false}
                    />
                </div>
                    <Paper elevation={3} className={classes.storyTimerPaper}>
                        <Typography variant="h6">Story duration</Typography>
                        <div className={classes.timerContainer}>
                            <Slider 
                                value={storyTimer}
                                min={500}
                                max={15000}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={ValueLabelComponent}
                                onChange={handleStoryTimerChange}
                                style={{width: 500, marginRight: 10}}
                            />
                            <Button variant="outlined" onClick={handleAddStory}>Upload</Button>
                        </div>
                    </Paper>
            </Container>}
        </Grow>
    )
}
