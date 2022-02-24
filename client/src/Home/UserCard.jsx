import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useBlockuser } from '../Services/blockuser';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor : "#red"
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({el}) {
  const classes = useStyles();
  const blockuser =useBlockuser()
  const handleclock =()=>{ 
    setBlockState(!blockState)
    blockuser(el._id);
   
  }
  const [blockState, setBlockState] = useState(el.blocked);
 
  return (
    <Card className={classes.root} style={{margin :40}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {el.age}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={el.username}
        subheader={el.name}
        style={{background : "#0277bd"}}
      />
      <CardMedia
        className={classes.media}
        image={el.pic}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {el.bio}
        </Typography>
      </CardContent>
      <CardActions >
        <IconButton aria-label="add to favorites" style={{color : blockState ? 'red':'green'}} onClick={()=>handleclock()} >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" >
          <ShareIcon />
        </IconButton>
      </CardActions>
      
    </Card>
  );
}