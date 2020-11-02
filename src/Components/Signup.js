import React,{Component} from 'react';
import './SignupStyle.css';
import {Paper,  Grid, TextField, Button,FormControl} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import image4 from "./image4.jpg"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios';
import AuthService from './AuthService';
import userService from './userService';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


export default class Signup extends Component{
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            address:"",
            phone:'',
            password: "",
            repassword: "",
            oldPassword:"",
            rememberMe: false,
            UpdatePassword : false,
            Books:[],
            vertical : 'top',
            horizontal : 'center',
            isSucess : false,
            image:''
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isUserName',(value) => {
            if((this.state.name.length>4)){
            return true;
            }
            return false;
            })
        ValidatorForm.addValidationRule('isEmail',(value) => {
            if(this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
            return true;
            }
            return false;
            })
        ValidatorForm.addValidationRule('isAddress',(value) => {
            if((this.state.address.length>10)){
            return true;
            }
            return false;
            })
        ValidatorForm.addValidationRule('isPhone',(value) => {
            if((this.state.phone.length==10)){
            return true;
            }
            return false;
            })
        ValidatorForm.addValidationRule('isPassword',(value) => {
            if((this.state.password.length>=8) && (this.state.password.length<=16)){
            return true;
            }
            return false;
            })

        ValidatorForm.addValidationRule('isOldPassword',(value) => {
            if((this.state.oldPassword.length>=8) && (this.state.oldPassword.length<=16)){
            return true;
            }
            return false;
            })

        ValidatorForm.addValidationRule('isRePassword',(value) => {
            if((this.state.repassword == this.state.password)){
            return true;
            }
            return false;
            })

        if(localStorage.getItem('user')){
            userService.getUserById(localStorage.getItem('id'))
            .then((Response) => {
                console.log(Response)
                this.setState({
                    name : Response.data.username,
                    address : Response.data.address,
                    phone : Response.data.phoneNum,
                    email : Response.data.email,
                    image : Response.data.image
                })
            })
        }
        
    }
 
 

    handleChange = event =>{
        const isCheckbox = event.target.type === 'checkbox';
        this.setState({
            [event.target.name]: isCheckbox 
            ? event.target.checked 
            : event.target.value
        })
    };

    HandleUpdatePassword = () => {
        this.setState({
            UpdatePassword:true
        })
    }

    NameValidate = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    Alert = () => {
        this.setState({snackbaropen:false})
        }

    AddressValidate = (e) => {
        this.setState ({
            address:e.target.value
        })
    }
    EmailValidate = (e) => {
        this.setState ({
            email:e.target.value
        })
    }  
    PhoneValidate = (e) => {
        this.setState ({
            phone:e.target.value
        })
    }  

    oldPasswordValidate = (e) => {
        this.setState ({
            oldPassword:e.target.value
        })
    }

    PasswordValidate = (e) => {
        this.setState ({
            password:e.target.value
        })
    }

    RePasswordValidate = (e) => {
        this.setState ({
            repassword:e.target.value
        })
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        var elements=[];
        console.log(e.target.files.length)
        let files = e.target.files
        console.log(files)
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
          console.log(" Imagedata",e.target.result)
          elements.push(e.target.result)
          this.setState({
            image:elements[0]
          })
        }
        // console.log(elements)
      }

    // validate = () => {
    //     if( this.state.emailError ||  this.state.nameError ||  this.state.passwordError ||  this.state.repasswordError ){
    //         return false;
    //     }
    //     return true;
    // };


    //------------------------------------------------------------------
    loginRender = () => {
        
        this.props.history.push('/home')
        window.location.reload()
    }

    handleUpdate = (event) => {
        let _user = {
            email:this.state.email,
            address:this.state.address,
            phoneNum : this.state.phone,
            image:this.state.image,
        }


        if(localStorage.getItem("user")){
            if(!this.state.UpdatePassword){
                    userService.updateUserByUser(localStorage.getItem('id'),_user)
                    .then((Response) => {
                        console.log(Response)
                        localStorage.setItem('image',this.state.image)
                        this.setState({snackbaropen:true,isSucess:true, message:'User Update Sucessfully'})
                        setTimeout(()=> this.loginRender(), 3000)
                    })
                    .catch((error) => {
                        this.setState({snackbaropen:true,isSucess:false, message:error.message})
                        setTimeout(()=> this.Alert(), 3000)
                    })
            }else{
                userService.updatePassword(localStorage.getItem('id'),this.state.oldPassword,this.state.password)
                .then((Response) => {
                    console.log(Response)
                    localStorage.setItem('token',Response.data.passwordChangeToken)
                    this.setState({snackbaropen:true,isSucess:true, message:'Password Update Sucessfully'})
                        setTimeout(()=> this.loginRender(), 3000)
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({snackbaropen:true,isSucess:false, message:error.message})
                    setTimeout(()=> this.Alert(), 3000)
                })
            }
        }
    }


    handleSubmit = (event) =>{
        event.preventDefault();


        if(this.state.name.length>4 && this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) &&
        this.state.address.length>10 && this.state.phone.length==10 && this.state.password.length>=8 && this.state.password.length<=16 && this.state.repassword == this.state.password && this.state.rememberMe){

            let _user = {
                username : this.state.name,
                email:this.state.email,
                address:this.state.address,
                phoneNum : this.state.phone,
                password:this.state.password,
                image:this.state.image,
            }

            let loginUser = {
                username : this.state.name,
                password:this.state.password
            }
        
            AuthService.signup(_user)
            .then((Response)=>{
                AuthService.login(loginUser)
                .then((Response)=>{
                    console.log(Response)
                    localStorage.setItem('user',Response.data.username)
                    localStorage.setItem('id',Response.data.id)
                    localStorage.setItem('token',Response.data.basicToken)
                    localStorage.setItem('tokenType',Response.data.tokenType)
                    localStorage.setItem('image',Response.data.image)
                    this.loginRender()
                })
                .catch((error) => {
                    this.setState({snackbaropen:true,isSucess:false, message:'oops Somthing went wrong'})
                    setTimeout(()=> this.Alert(), 3000)
                })
                    
            })
            .catch((error) => {
                console.log(error.message)
                this.setState({snackbaropen:true,isSucess:false, message:"Username 0r Email Already taken"})
                // setTimeout(()=> this.Alert(), 3000)
            })
        }else{
            this.setState({snackbaropen:true,isSucess:false, message:'Please fill form correctly'})
            setTimeout(()=> this.Alert(), 3000)
        }
    };
    render(){
        const { vertical, horizontal } = this.state;
        console.log(this.state.Books)
        return(
            <>
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
            {!localStorage.getItem('user') ? (
            <Grid container spacing={1} style = {{marginTop:30}}>
                <Grid item xs = {7}>
                    <img src= {image4} heigth = "50%" width = "50%" alt = "Background Books"/>
                </Grid>
                <Grid item xs = {4} style = {{marginBottom:15}}>
                <Card style = {{backgroundColor:"#8c8c8c"}}>
                <Paper style = {{margin:10}}>
                <ValidatorForm noValidate autoComplete="off" style={{width:'100%'}}onSubmit={this.handleSubmit}>
                <br/>
                <h2>Register Your Account</h2>
                    <TextValidator 
                    required='true' 
                    label="Username" 
                    variant="outlined" 
                    helperText="Enter your username" 
                    validators={['required',"isUserName"]}
                    onChange={this.NameValidate} 
                    value={this.state.name}
                    errorMessages = {["This field is not Empty","Username must be more than 4 characters"]}
                    size="small"
                    style = {{width: 300}}
                    />
{/* ------------------------------------------------------------------ */}
                <div>
                    <TextValidator 
                    required='true' 
                    label="E-Mail" 
                    variant="outlined" 
                    helperText="Enter your email" 
                    validators={['required',"isEmail"]}
                    errorMessages = {["This field is not Empty","E-Mail must be in E-Mail format"]}
                    value = {this.state.email} 
                    onChange = {this.EmailValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* --------------------------------------------------------------------------- */}
                <div>
                    <TextValidator 
                    Required
                    required='true' 
                    label="Address" 
                    variant="outlined" 
                    helperText="Enter your Address" 
                    validators={['required',"isAddress"]}
                    errorMessages = {["This field is not Empty","Address must be more than 4 characters"]}
                    value = {this.state.address} 
                    onChange = {this.AddressValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* ------------------------------------------------------------------------------- */}

                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="Phone Number" 
                    variant="outlined" 
                    helperText="Enter your Phone Number" 
                    validators={['required',"isPhone"]}
                    errorMessages = {["This field is not Empty","Phone Number must be in 10 Numbers"]}
                    value = {this.state.phone} 
                    onChange = {this.PhoneValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>

{/* --------------------------------------------------------------------------- */}
                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="Password" 
                    type = 'password'
                    variant="outlined" 
                    helperText="Enter your Password" 
                    validators={['required',"isPassword"]}
                    errorMessages = {["This field is not Empty","Password must be between 8 & 16 characters"]}
                    value = {this.state.password} 
                    onChange = {this.PasswordValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* --------------------------------------------------------------------------- */}
                <div>
                    <TextValidator 
                    Required
                    required='true' 
                    label="Password" 
                    type = 'password'
                    variant="outlined" 
                    helperText="Enter your Password Again" 
                    validators={['required',"isRePassword"]}
                    errorMessages = {["This field is not Empty","Password did not match"]}
                    value = {this.state.repassword} 
                    onChange = {this.RePasswordValidate}
                    size="small" 
                    style = {{width: 300}}
                    />
                </div>
                <div style = {{color:"  #7b7c7e  "}}>
                <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                         <br/>
                        <span style = {{fontSize:12}}>Update your Profile picture </span>
                </div>
{/* ------------------------------------------------------------- */}
                <div style = {{fontSize: 12}}>
                    <input 
                    name = 'rememberMe'
                    type = 'checkbox' 
                    id = 'check'
                    checked = {this.state.rememberMe}
                    onChange = {this.handleChange}
                    />
                    &nbsp; I have read and agree to the terms and conditions
                </div>
{/* ------------------------------------------------------------------ */}

                <div>
                    <Button
                    type = 'submit'
                    >
                        Submit
                    </Button>
{/* ----------------------------------------------------------------------- */}
                </div>

                <span style = {{fontSize: 12}}>Already have an acoount <a href = "/login">login in</a></span>
                
            </ValidatorForm>
            </Paper>
            </Card>
            </Grid>
            <Grid item xs = {1}/>
            </Grid>
            ):( !this.state.UpdatePassword ? (  
                <Grid container spacing={1} style = {{marginTop:30}}>
                <Grid item xs = {7}>
                    <img src= {image4} heigth = "50%" width = "50%" alt = "Background Books"/>
                </Grid>
                <Grid item xs = {4} style = {{marginBottom:15}}>
                <Card style = {{backgroundColor:"#8c8c8c"}}>
                <Paper style = {{margin:10}}>
                <ValidatorForm noValidate autoComplete="off" style={{width:'100%'}}onSubmit={this.handleUpdate}>
                <br/>
                <h2>Edit Your Deatils</h2>
                    <TextValidator 
                        disabled
                        label="Username" 
                        variant="outlined" 
                        helperText="Enter your username" 
                        validators={['required',"isUserName"]}
                        onChange={this.NameValidate} 
                        value={this.state.name}
                        errorMessages = {["This field is not Empty","Username must be more than 4 characters"]}
                        size="small"
                        style = {{width: 300}}
                        />
{/* ------------------------------------------------------------------ */}
                <div>
                <TextValidator 
                    required='true' 
                    label="E-Mail" 
                    variant="outlined" 
                    helperText="Enter your email" 
                    validators={['required',"isEmail"]}
                    errorMessages = {["This field is not Empty","E-Mail must be in E-Mail format"]}
                    value = {this.state.email} 
                    onChange = {this.EmailValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* --------------------------------------------------------------------------- */}
                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="Address" 
                    variant="outlined" 
                    helperText="Enter your Address" 
                    validators={['required',"isAddress"]}
                    errorMessages = {["This field is not Empty","Address must be more than 4 characters"]}
                    value = {this.state.address} 
                    onChange = {this.AddressValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* ------------------------------------------------------------------------------- */}

                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="Phone Number" 
                    variant="outlined" 
                    helperText="Enter your Phone Number" 
                    validators={['required',"isPhone"]}
                    errorMessages = {["This field is not Empty","Phone Number must be in 10 Numbers"]}
                    value = {this.state.phone} 
                    onChange = {this.PhoneValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
                <div style = {{color:"  #7b7c7e  "}}>
                <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                        <br/>
                        <span style = {{fontSize:12}}>Update your Profile picture </span>
                </div>


{/* ------------------------------------------------------------- */}
               
                <h5>If you want to change the password <u style = {{color:"BLUE"}}><a onClick = {this.HandleUpdatePassword}>Click Here</a></u></h5>
{/* ------------------------------------------------------------------ */}

                <div>
                    <Button
                    type = 'submit'
                    onClick = {this.handleUpdate}
                    >
                        Update
                    </Button>
{/* ----------------------------------------------------------------------- */}
                </div>  
            </ValidatorForm>
            </Paper>
            </Card>
            </Grid>
            <Grid item xs = {1}/>
            </Grid>
            ):(
                <Grid container spacing={1} style = {{marginTop:30}}>
                <Grid item xs = {7}>
                    <img src= {image4} heigth = "50%" width = "50%" alt = "Background Books"/>
                </Grid>
                <Grid item xs = {4} style = {{marginTop:60}}>
                <Card style = {{backgroundColor:"#8c8c8c"}}>
                <Paper style = {{margin:10}}>
                <ValidatorForm noValidate autoComplete="off" style={{width:'100%'}}onSubmit={this.handleUpdate}>
                <br/>
                <h2>Edit Your Password</h2>
                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="Old Password" 
                    type = 'password'
                    variant="outlined" 
                    helperText="Enter your Password" 
                    validators={['required',"isOldPassword"]}
                    errorMessages = {["This field is not Empty","Password must be between 8 & 16 characters"]}
                    value = {this.state.oldPassword} 
                    onChange = {this.oldPasswordValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* --------------------------------------------------------------------------- */}
                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="New Password" 
                    type = 'password'
                    variant="outlined" 
                    helperText="Enter your new Password" 
                    validators={['required',"isPassword"]}
                    errorMessages = {["This field is not Empty","Password must be between 8 & 16 characters"]}
                    value = {this.state.password} 
                    onChange = {this.PasswordValidate} 
                    size="small"
                    style = {{width: 300}}
                    />
                </div>
{/* --------------------------------------------------------------------------- */}
                <div>
                <TextValidator 
                    Required
                    required='true' 
                    label="Password" 
                    type = 'password'
                    variant="outlined" 
                    helperText="Enter your Password Again" 
                    validators={['required',"isRePassword"]}
                    errorMessages = {["This field is not Empty","Password did not match"]}
                    value = {this.state.repassword} 
                    onChange = {this.RePasswordValidate} 
                    style = {{width: 300}}
                    />
                </div>
{/* ------------------------------------------------------------- */}
                <div>
                    <Button
                    type = 'submit'
                    onClick = {this.handleUpdate}
                    >
                        Update
                    </Button>
{/* ----------------------------------------------------------------------- */}
                </div>  
            </ValidatorForm>
            </Paper>
            </Card>
            </Grid>
            <Grid item xs = {1}/>
            </Grid>
            ))
            }
            </>
        );
    }
}