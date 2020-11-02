import React from 'react';
import Grid from '@material-ui/core/Grid';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';
import Typography from '@material-ui/core/Typography';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import '../App.css';



function BookSoulsDef(){
    return(
        <>
            <Grid container spacing={1} >
                <Grid item xs = {1}/>
                <Grid item xs = {10}>
                    <Grid container spacing={1} >
                    <Grid item xs = {1}>
                        <Typography>
                                <AirportShuttleOutlinedIcon style={{ fontSize: 90 }}/>     
                        </Typography>
                    </Grid>
                    <Grid item xs = {2}>
                        <Typography>
                            <br/>
                            Islandwide Delivery is available for all order
                        </Typography>
                    </Grid>
                    <Grid item xs = {1}>
                        <br/>
                        <span class="vertical-line"></span>
                    </Grid>
                    <Grid item xs = {1} >
                        <Typography>
                                <CachedOutlinedIcon style={{ fontSize: 90 }}/>     
                        </Typography>
                    </Grid>
                    <Grid item xs = {2}>
                        <Typography>
                            <br/>
                            You can trade your lovable Books
                        </Typography>
                    </Grid>
                    <Grid item xs = {1} >
                        <br/>
                        <span class="vertical-line"></span>
                    </Grid>
                    <Grid item xs = {1} >
                        <Typography>
                                <ThumbUpOutlinedIcon style={{ fontSize: 90 }}/>     
                        </Typography>
                    </Grid>
                    <Grid item xs = {2}>
                        <Typography>
                            <br/>
                            buy Your favourit Book with a reasonable price range
                        </Typography>
                    </Grid>
                </Grid>
                </Grid>
                <Grid item xs = {1} />
            </Grid>
            <div style = {{backgroundColor:"gray"}}>
                <Grid container spacing={1} >
                    <Grid item xs = {5} style = {{color:"#36c2f7"}} >
                        <br/><br/>
                        <strong style={{ fontSize: 32 }}> <center>Why Booksouls ?</center></strong>
                        <br/><br/>
                    </Grid>
                    <Grid item xs = {6}>
                        <br/><br/>
                        <strong style = {{color:"#ffffff"}}> <center>Booksouls helps to sell your used books with the reasonable price and also helps to buy your loved book with resanoble price</center></strong>
                        <br/><br/>
                    </Grid>
                    <Grid item xs = {1}/>
                </Grid>
            </div>
        </>
    )
}
export default BookSoulsDef