import { Pagination, PaginationItem } from '@material-ui/lab'
import { useSelector } from 'react-redux';
import { Grid, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './Styles'


const Paginate = () => {
    const classes = useStyles()
    const pageNumber = useSelector(state => state.posts.numberOfPages)
    const currentPage = useSelector(state =>  state.posts.currentPage)
    return (
        <Grid container className={classes.paginationContainer}>
            <Grid item xs={12} sm={6}>
                <Paper variant="outlined">
                    <Pagination 
                        classes={{ul: classes.ul}}
                        count={pageNumber}
                        page={currentPage}
                        variant="outlined"
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                        )}
                    />
                </Paper>         
            </Grid>
        </Grid> 
    )
}

export default Paginate
