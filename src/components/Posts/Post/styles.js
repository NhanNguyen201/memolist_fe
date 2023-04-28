import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 225,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundBlendMode: 'darken',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
  },
  grid: {
    display: 'flex',
  },
  tagDetails: {
    minHeight: 100,
  },
  tagChip: {
    margin: "2px",
    borderRadius: 5
  },
  title: {
    textIndent: '10px'
  },
  postTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  userName: {
    fontWeight: 700,
    textDecoration: 'none',
  },

  
});