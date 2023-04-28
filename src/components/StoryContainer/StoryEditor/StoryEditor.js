import { useState, useRef } from 'react'
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip';
import 'tui-image-editor/dist/tui-image-editor.min.css';
import "tui-color-picker/dist/tui-color-picker.min.css"
import ImageEditor from '@toast-ui/react-image-editor';
import useStyle from './Styles'

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={`${(value / 1000).toFixed(2)} seconds`}>
        {children}
      </Tooltip>
    );
}

export default function StoryEditor({createStory}) {
    const classes = useStyle();
    const editorRef = useRef(null);
    const [isEditorOpen, setEditorOpen] = useState(false);
    const [storyTimer, setStoryTimer] = useState(500);
    const [storyName, setStoryName] = useState('');
    const handleStoryTimerChange = (e, value) => {
        if(value){
            setStoryTimer(value)
        }
    }
    const handleOpenEditor = () => {
        setEditorOpen(!isEditorOpen)
    }
    const handleCreateStory = () => {
        const editorInstance = editorRef.current.getInstance();
        const editorImage = editorInstance.toDataURL()
        createStory({storyImage: editorImage, duration: storyTimer, storyName})
    }
    return (
        <>  
            <div className={classes.editorOpenBtn}>
                <Paper elevation={3} className={classes.storyEditorPaper} onClick={handleOpenEditor}>
                    <AddIcon fontSize="large"/>
                </Paper>
            </div>
            {isEditorOpen && <Grow in >
                <>
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
                        <Typography variant="h6">Story name</Typography>
                        <TextField
                            fullWidth
                            value={storyName}
                            onChange={e => setStoryName(e.target.value)}
                        />
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
                            <Button variant="outlined" onClick={handleCreateStory}>Upload</Button>
                        </div>
                    </Paper>
                </>
            </Grow>}
        </>
    )
}
