import React, {Component} from "react";
import{Card,CardContent,Typography,FormControl,TextField,Grid,Paper} from "@material-ui/core";
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import image5 from "./image5.png"
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

const style={
    
  root:{
    minWidth:450,
    
    backgroundColor:"#8c8c8c",
    marginTop:40,
    color:'#212121',
    marginBottom : 40
    },
    card:{
      minWidth:500,
      backgroundcolor:'#212121',
      color:"#424242",
      margin:50
    }     
  }

export default class EditBook extends Component{
  constructor (){
    super()
    this.state = {
      edit : false,
      id:0,
      name  : '',
      authorName : '',
	    description : '',
	    category : '',
      isbNumber : '',
      price: '',
      usage : '',
      sellerId : '',
      image:[],
      vertical : 'top',
      horizontal : 'center',
      isSucess : false,
    }
    //console.log(localStorage.getItem('bookId'))
    // console.log(this.state.id)
    //localStorage.removeItem('bookId')
  }

onFileChangeHandler = (e) => {
    e.preventDefault();
    var elements=[];
    console.log(e.target.files.length)
    let files = e.target.files
    console.log(files)
    for(let i = 0; i<e.target.files.length; i++){
    let reader = new FileReader()
    reader.readAsDataURL(files[i])
    reader.onload = (e) => {
      console.log(" Imagedata",e.target.result)
      elements.push(e.target.result)
      this.setState({
        image:elements
      })
    }
    // console.log(elements)
  }
}

  BookNameChange = (e) => {
    this.setState ({
        name:e.target.value
    })
    //console.log(e.target.value)
  }

  AuthorNameChange = (e) => {
    this.setState ({
      authorName:e.target.value
    })
    console.log(this.state.authorName)
  }

  DescriptionChange = (e) => {
    this.setState ({
      description:e.target.value
    })
  }

  CategoryChange = (e) => {
    this.setState ({
      category:e.target.value
    })
  }

  ISBNumberChange = (e) => {
    this.setState ({
      isbNumber:e.target.value
    })
  }

  PriceChange = (e) => {
    this.setState ({
      price:e.target.value
    })
  }

  UsageChange = (e) => {
    this.setState ({
      usage:e.target.value
    })
  }

  updateUser = (e) => {
    // this.setState({
    //   id:localStorage.getItem('bookId')
    // })
    //e.preventDefault()
    //console.log("ffffffffffffffffffffffffff")
    let book = {
      name : this.state.name,
      authorName : this.state.authorName,
      description : this.state.description,
      category : this.state.category,
      isbNumber : this.state.isbNumber,
      price : this.state.price,
      image:this.state.image,
      usage : this.state.usage,
      sellerId : this.state.sellerId
    }
    if(this.state.name && this.state.authorName && this.state.description && this.state.category 
      && this.state.isbNumber && this.state.price && this.state.image && this.state.usage){
      axios.put('http://localhost:8081/books/' + this.props.match.params.id,book, {headers : {"Authorization" : localStorage.getItem('tokenType') + " " + localStorage.getItem('token')}})
        .then((Resposne) => {
          console.log(Response)
          this.setState({snackbaropen:true,isSucess:true, message:'Book Update Successfully'})
          setTimeout(()=> this.fillAlert(), 3000)
          //this.props.history.push("/BookDetails");
        })
        .catch((error) => {
          console.log(error)
        })
    }else {
      this.setState({snackbaropen:true, message:'Please Fill the Form Properly'})
      setTimeout(()=> this.fillAlert(), 4000)
    }
  }

  handleReset = () => {
    this.setState({
      name : "",
      authorName : "",
      description : "",
      category : "",
      isbNumber : "",
      price : "",
      image:"",
      usage : "",
    })
  }

  fillAlert = () => {
    this.setState({snackbaropen:false})
    if(this.state.isSucess){
      this.props.history.push("/BookDetails");
    }
  }

  componentDidMount () {
    // console.log(this.props.match.params.id)
    this.setState({
      id:this.props.match.params.id
    })
    axios.get('http://localhost:8081/books/' + this.props.match.params.id)
    .then((Response) => {
      console.log(Response)
      this.setState({
        name:Response.data.name,
        authorName : Response.data.authorName,
        description : Response.data.description,
        category : Response.data.category,
        isbNumber : Response.data.isbNumber,
        price: Response.data.price,
        image : Response.data.image,
        usage : Response.data.usage,
        sellerId :Response.data.sellerId
      })
    })
}
    render(){
      const { vertical, horizontal } = this.state;
      //console.log(this.state.image)
        return(
          <>
          <div>
            <Snackbar open={this.state.snackbaropen} autoHideDuration={4000} anchorOrigin={{ vertical,horizontal }} key={vertical + horizontal}>
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
          
          <Grid container style={{marginBottom:"8%"}}>
              <Grid item xs={1}/>
              <Grid item xs={5} style = {{marginTop:60}}>
                  <img src= {image5}  alt = "Background Books"/>
              </Grid>
              <Grid item xs={1}/>
              <Grid item xs={4}>
              <Card style={style.root} >
                <Paper style={{margin:10}}>
          
              <CardContent>
                <form >
                  
                  <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h2" >Edit Book</Typography>
                      </Grid>


                      
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <TextField
                               variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               id="Book name"
                               value = {this.state.name}
                               onChange = {this.BookNameChange}
                               label="Book Name"
                               name="book name"
                               autoComplete="book name"
                               autoFocus
                         />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <TextField
                               variant="outlined"
                               margin="normal"
                               value = {this.state.authorName}
                               onChange = {this.AuthorNameChange}
                               required
                               fullWidth
                               id="author name"
                               label="Author Name"
                               name="author name"
                               autoComplete="auther name"
                         />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <TextField 
                              type = "text area"
                               variant="outlined"
                               margin="normal"
                               value = {this.state.description}
                               onChange = {this.DescriptionChange}
                               required
                               fullWidth
                               id="descripition"
                               label="Descripition"
                               name="descripition"
                               autoComplete="Descripition"
                         />
                         </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <TextField
                               variant="outlined"
                               margin="normal"
                               required
                               value = {this.state.isbNumber}
                               onChange = {this.ISBNumberChange}
                               fullWidth
                               id="ISBN number"
                               label="ISBN Number"
                               name="ISBN Number"
                               autoComplete="ISBN number"
                         />
                        </FormControl>
                      </Grid>


                      


                      <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="Condition">Condition</InputLabel>
                          <Select
                              //  variant="outlined"
                              //  margin="normal"
                               value = {this.state.usage}
                               onChange = {this.UsageChange}
                                required
                               fullWidth
                               id="Usage"
                               label="Usage"
                              //  name="Usage"
                              //  autoComplete="Usage"
                         >
                         <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value={"New"}>Like New</MenuItem>
                                <MenuItem value={"good"}>Good</MenuItem>
                                <MenuItem value={"avg"}>Average</MenuItem>
                                <MenuItem value={"used"}>Used</MenuItem>
                                </Select>
                        </FormControl>
                      </Grid>


                      <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="Category">Category</InputLabel>
                          <Select
                              //  variant="outlined"
                              //  margin="normal"
                               value = {this.state.category}
                               onChange = {this.CategoryChange}
                               fullWidth
                               id="Category"
                               label="Category"
                              //  name="Category"
                              //  autoComplete="Category"
                         >
                           <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value={"story"}>Story</MenuItem>
                                <MenuItem value={"novel"}>Novel</MenuItem>
                                <MenuItem value={"scifi"}>Sci-Fi</MenuItem>
                                <MenuItem value={"drama"}>Drama</MenuItem>
                                </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <TextField
                               variant="outlined"
                               margin="normal"
                               value = {this.state.price}
                               onChange = {this.PriceChange}
                               required
                               fullWidth
                               id="price"
                               label="Price"
                               name="Price"
                               autoComplete="Price"
                         />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        {/* <FormControl fullWidth>
                          <TextField
                               variant="outlined"
                               margin="normal"
                              //  fullWidth
                               id="address"
                               label="Address"
                               name="address"
                               autoComplete="address"
                         />
                        </FormControl> */}
                      </Grid>
                      <Grid item xs={6}>
                         <input
                          accept="image/*"
                          display="none"
                          //value = {this.state.image}

                          onChange={this.onFileChangeHandler}
                          id="contained-button-file"
                          multiple
                          type="file"
                        />
                      </Grid>
                      <Grid item xs={6}/>
                        
                      
                      <Grid item xs={3}>
                        <FormControl>
                          <Button
                               //type="submit"
                               fullWidth
                               variant="contained"
                               color="primary"
                               onClick={() => this.updateUser()}
                               //onClick={this.updateUser}
                           >
                             Update
                          </Button>
                       </FormControl>
                       </Grid>
                       {/* <label htmlFor="contained-button-file">
          Please Upload
        </label> */}
        
                         
                        <Grid item xs={2}>
                        <FormControl>
                          <Button
                               type="reset"
                               fullWidth
                               variant="contained"
                               color="primary"
                               onClick = {() => this.handleReset()}
                          >
                         RESET
                          </Button>
                        </FormControl>
                      </Grid>


        
      {/* <Avatar src="/broken-image.jpg" /> */}


                      {/* <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label> */}

                      {/* <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> */}

                      

                      </Grid> 
                 
                  
                </form>
              </CardContent>
              </Paper>
        </Card>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
      </>
      
        )
    }
}