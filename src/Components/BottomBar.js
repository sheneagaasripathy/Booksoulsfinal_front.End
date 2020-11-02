import React from 'react'
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import Logo from './Logo.png';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        marginBottom: 0,
      backgroundColor:'#EECE5C',
      color: 'black',
      
    },
});


function BottomBar() {
    const classes = useStyles();
    let Year = new Date().getFullYear();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Grid container spacing={1}>
            <Grid item xs={2}>
                <br/>
                <br/>
                <strong>Contact us:</strong><br/>
                <Tooltip title="Mail To us">
                <IconButton href = "mailto:booksouls@2020gmail.com">
                    <EmailIcon style = {{color:"black"}}/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Our Facebook Page">
                <IconButton href =  "https://www.facebook.com/Booksouls-100599195112923/">
                    <FacebookIcon style = {{color:"black"}}/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Our Instagram Page">
                <IconButton href = "https://www.instagram.com/booksouls2020/">
                    <InstagramIcon style = {{color:"black"}}/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Our Twitter Page">
                <IconButton href = "https://twitter.com/Booksouls1">
                    <TwitterIcon style = {{color:"black"}}/>
                </IconButton>
                </Tooltip>
                
            </Grid>
            <Grid item xs={8} style = {{marginTop:10}}>
                <Typography variant="overline" align="center" >
                    <img src = {Logo} height="50" width="150" alt = "Logo"/><br/>
                    Copyrights <CopyrightIcon style={{ fontSize: 15 }}/> {Year}-{Year+1} <br/> Team Privacy
                </Typography>
            </Grid>
            <Grid item xs={2}/>
            </Grid>
        </AppBar>
    )
}

export default BottomBar