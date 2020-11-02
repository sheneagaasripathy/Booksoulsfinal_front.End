import React, {Component} from "react";
import{Card,CardContent,Typography,FormControl,TextField,Grid, Paper} from "@material-ui/core";
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert';
import image3 from './image3.jpg'
import BuyPhoto from "./BuyPhoto";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';




const style={
    root:{
        minWidth:450,
        
        backgroundColor:"#8c8c8c",
        marginBottom:20,
        color:'#212121'
    },
    card:{
      minWidth:500,
      backgroundcolor:'#8c8c8c',
      color:"#424242",
      marginTop:20
    }
    
}
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}


export default class Buy extends Component{

      constructor(){
        super()
        this.state = {
          open : false,
          book:{},
          buyerName:'',
          buyerAddress:'',
          buyerPhoneNum:'',
          image:[""],
          vertical : 'top',
          horizontal : 'center',
          isSucess : false,
        }
        
      }

      componentDidMount(){
          axios.get('http://localhost:8081/books/'+ this.props.match.params.id)
          .then((Response) => {
            console.log(Response.data)
            this.setState({
              book:Response.data,
              image:Response.data.image
            })
          })
          
          
    }

    buyerNameChange = (e) => {
      this.setState({
        buyerName:e.target.value
      })
    }
    buyerAddressChange = (e) => {
      this.setState({
        buyerAddress:e.target.value
      })
    }
    buyerPhNoChange = (e) => {
      this.setState({
        buyerPhoneNum:e.target.value
      })
    }
    fillAlert = () => {
      this.setState({snackbaropen:false})
      if(this.state.isSucess){
        this.props.history.push("/home");
      }
    }

      IsAlert =  () =>{
        let pending = {
          book : this.state.book,
          buyerName : this.state.buyerName,
          buyerAddress : this.state.buyerAddress,
          buyerPhoneNum : this.state.buyerPhoneNum
        }
        if(this.state.buyerAddress && this.state.buyerName && this.state.buyerPhoneNum){
          axios.post('http://localhost:8081/pending',pending)
          .then((Response) => {
            console.log(pending)
            axios.delete('http://localhost:8081/books/'+ this.props.match.params.id)
            this.setState({snackbaropen:true,isSucess:true,open : false, message:'We will deliver your book soon..!! — Thank you!'})
            setTimeout(()=> this.fillAlert(), 3000)
          })
        }else {
          this.setState({snackbaropen:true, message:'Please Fill the Whole Form'})
          setTimeout(()=> this.fillAlert(), 4000)
        }
      }
      handleClickOpen = () => {
        this.setState ({
          open : true,
        })
      };
    
      handleClose = () => {
        this.setState ({
          open : false,
        })
      };
      
  
    render(){
      const { vertical, horizontal } = this.state;
      //console.log(this.state.book)
        return(
          <>
            <div>
            <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} anchorOrigin={{ vertical,horizontal }} key={vertical + horizontal}>
              { this.state.isSucess ? (
                <Alert severity="success">
                  {this.state.message}
                </Alert>
              ):(
                <Alert severity="warning">
                {this.state.message}
              </Alert>
              )
              }
            </Snackbar>
          </div>
        <Grid container spacing = {1}  style = {{marginTop:30,marginBottom:"17%"}}> 
        <Grid item xs={5}>
          <img src = {image3} height = "65%" width = "70%" alt = "Background Books"/>
        </Grid>
        <Grid item xs={6}>
          <Card style={style.root}>
            <Paper style={{margin:10}}>
              <CardContent>
                  <Grid container spacing={1}>
                      <Grid item xs={5}>
                        <br/><br/><br/>
                        <BuyPhoto image = {this.state.image}/>
                      </Grid>
                      <Grid item xs={7}>
                        <div>
                          <h2>{this.state.book.name}</h2>
                          <h4 style={{textAlign:"left"}}>Author : {this.state.book.authorName}</h4>
                          <h4 style={{textAlign:"left"}}>Descrpition : {this.state.book.description}</h4>
                          <h4 style={{textAlign:"left"}}>ISBN Number : {this.state.book.isbNumber}</h4>
                          <h4 style={{textAlign:"left"}}>Category : {this.state.book.category}</h4>
                          <h4 style={{textAlign:"left"}}>Usage : {this.state.book.usage}</h4>
                          <h4 style={{textAlign:"left"}}>Price : {this.state.book.price}</h4>
                        </div>
                      </Grid>
                      <Grid item xs={10}/>
                      <Grid item xs={2}>
                        <FormControl>
                          
                          <Button
                               type="submit"
                               fullWidth
                               variant="contained"
                               color="primary"
                               onClick={this.handleClickOpen}
                               style = {{backgroundColor:" #4a95e9 "}}
                            >
                             BUY
                          </Button>
                          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                          <DialogTitle id="form-dialog-title">Confirmation</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              We thank you so much for business with us and we need some details from you to deliver your Book to you they are:
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              value = {this.state.buyerName}
                              onChange = {this.buyerNameChange}
                              helperText = ""
                              label="Name"
                              type="text"
                              fullWidth
                            />
                            <TextField
                              margin="dense"
                              id="address"
                              value = {this.state.buyerAddress}
                              onChange = {this.buyerAddressChange}
                              helperText = ""
                              label="Deliver Address"
                              type="text"
                              fullWidth
                            />
                            <TextField
                              margin="dense"
                              id="telNum"
                              value = {this.state.buyerPhoneNum}
                              onChange = {this.buyerPhNoChange}
                              helperText = ""
                              label="Telephone Number"
                              type="text"
                              fullWidth
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button  onClick = {() => this.IsAlert()} color="primary">
                              Accept
                            </Button>
                          </DialogActions>
                        </Dialog>
                       </FormControl>
                       </Grid>  
                       </Grid> 
                       {/* {this.state.alertMessage ? 
                          (<><br/>
                          <Alert severity="success">We will deliver your book soon..!! — Thank you!</Alert>
                            <Box component="fieldset" borderColor="transparent" > 
                              <Typography ><center> Rate Us </center></Typography>
                              <Rating
                                name="Rate"
                                defaultValue={1}
                                getLabelText={(value) => customIcons[value].label}
                                IconContainerComponent={IconContainer}
                              />
                            </Box>
                          </>):(null)
                        }     */}
                   
              </CardContent>
              </Paper>
        </Card>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
      </>
        )
    }
}

