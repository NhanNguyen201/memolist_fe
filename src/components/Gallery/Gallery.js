import { useState, useEffect } from 'react';
import useStyles from './styles';

import { Image, Video } from 'cloudinary-react';
import { Grid, Paper } from '@material-ui/core';

const Gallery = ({selectedFiles}) => {
    const classes = useStyles();
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    useEffect(() => {
        let imgs = selectedFiles.filter(file => file.resource_type === 'image');
        let vids = selectedFiles.filter(file => file.resource_type === 'video');
        setImages(imgs);
        setVideos(vids);
    }, [selectedFiles])
    return (
        <div className={classes.galleryContainer}>
            <Grid container className={classes.videoContainer} spacing={4}>
                {videos.map(video => 
                    <Grid item xs={12} md={12} key={video.public_id}>
                        <Paper className={classes.videoPaper} square elevation={4}>
                            <Video cloudName={process.env.REACT_APP_CLOUDINARY_NAME} publicId={video.public_id} controls={true} crop="fit" style={{width: "100%", maxHeight: "75vh"}}/>
                        </Paper>
                    </Grid>
                )}
            </Grid>
            <div className={classes.imageContainer}>
                {images.map(img =>
                    <Paper className={classes.imagePaper} square elevation={4} key={img.public_id}>
                        <Image 
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME} 
                            publicId={img.public_id} 
                            loading="lazy"
                            crop="scale"
                            dpr="auto"
                            quality="auto"
                            height="500" 
                        />
                    </Paper>
                )}
            </div>
        </div>
    )
}

export default Gallery
