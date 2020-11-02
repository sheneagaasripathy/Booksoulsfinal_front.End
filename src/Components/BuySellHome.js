import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import BookListHome from './BookListHome';
import BookSoulsDef from './BookSoulsDef';
import WhyShouldBookSouls from './WhyShouldBookSouls';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      
    },
    margin: {
      margin: theme.spacing(1),
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {

      display: 'block',
    },
  }));



  
  const style = {
    root: {
      backgroundImage: `url("https://i.pinimg.com/originals/04/5c/70/045c70e3dcdb99ec3fa50aebb6cc3668.jpg")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      color: 'white'
    },
    title: {
      fontSize: 24,
      textAlign:'center'
    },  
}



  function BuySellHome() {
    const classes = useStyles();
    
    return (
      <>
      <div className={classes.root}  style={{ padding: 5 }}>
        <Grid container spacing={1} >
          <Grid item xs = {12}>
          <Paper>
              <Card style={style.root} variant="outlined" >
                <div style={{ margin: 40 }}> 
                      <Grid container spacing={1} style = {{marginTop:20}}>
                          <Grid item xs = {7}/>
                          <Grid item xs = {2}>
                              <Paper style={{ marginTop: 10 }}>
                                  <Card variant="outlined" style = {{backgroundColor:"#EECE5C"}}> 
                                  <Button size="large" style = {{backgroundColor:"#EECE5C"}} href = "/buy">Buy</Button>
                                  </Card>
                              </Paper>
                          </Grid>
                          <Grid item xs = {2}>
                              <Paper style={{ marginTop: 10 }}>
                                  <Card variant="outlined" style = {{backgroundColor:"#EECE5C"}}> 
                                  <Button size="large" style = {{backgroundColor:"#EECE5C"}} href = "/sell">Sell</Button>
                                  </Card>
                              </Paper>
                          </Grid>
                          <Grid item xs = {1}/>
                      </Grid>
                </div>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <BookListHome/>
        <br/>
        <BookSoulsDef/>
        <WhyShouldBookSouls/>
        </div>
      </>
    )
  }

export default BuySellHome 