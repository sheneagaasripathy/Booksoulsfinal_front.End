import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Logo from './Logo.png';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import BuySellHome from './BuySellHome';
import AllBookBuy from './AllBooksBuy';
import Login from './Login';
import Signup from './Signup';
import Buy from './Buy';
import Sell from './Sell';
import Admin from './Admin';
import BookDetails from './BookDetails';
import EditBook from './EditBook';
import Pending from './Pending';
import User from './User';
import AddUser from './AddUser';




class NavBar extends Component {
    constructor(props){
        super();
        this.state = {
            AnchorEl : null
        }
        console.log(localStorage.getItem('user'))
    }
    handleClick = (event) => {
        this.setState({
            AnchorEl  : event.currentTarget
        });
      };
    
    handleClose = () => {
        this.setState({
            AnchorEl  : null
        });
      };


      handleLogoutClose = () => {
        this.setState({
            AnchorEl  : null
        })
        localStorage. clear()
      }

    
    render(){
        return(
            <>
                <Router>
                    <AppBar position = "sticky" style = {{backgroundColor:"#EECE5C"}}>
                        <Toolbar style = {{color:"black"}}>
                        <Grid container spacing={1}>
                        <Grid item xs={2}>
                        <Tooltip title="Home">
                        <IconButton href = "/home">
                            <LibraryBooksTwoToneIcon fontSize = "large">  </LibraryBooksTwoToneIcon>
                               <img src = {Logo} height="30" width="75" alt = "Logo"/>
                        </IconButton>
                        </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                             {localStorage.getItem('role') == "ROLE_ADMIN"? (
                                 <>
                                  <br/>
                                  <Typography style = {{marginTop:"5"}}>
                                      <Button variant="outlined" color="white" href = "/admin" style = {{width:"100%"}}>
                                          Admin Pannel
                                      </Button>
                                  </Typography>
                                </>
                             ):(null)}
                        </Grid>
                        <Grid item xs={6}/>
                        {!localStorage.getItem('user') ? (
                            <>
                            <Grid item xs={1}>
                                <br/>
                                <Typography style = {{marginTop:"5"}}>
                                    <Button variant="outlined" color="white" href = "/login" style = {{width:"100%"}}>
                                        Login
                                    </Button>
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <br/>
                                <Typography>
                                    <Button variant="outlined" color="white" href = "/signup" style = {{width:"100%"}}>
                                        Signup
                                    </Button>
                                </Typography>
                            </Grid></>):
                            (<>
                                
                                <Grid item xs={1}  style = {{marginRight:0,marginTop:35}}>
                                <span >{localStorage.getItem('user')}</span>
                                </Grid>
                                <Grid item xs={1}>
                                <Avatar size = 'small'  src={localStorage.getItem('image')} style = {{display : "inline-block",marginTop:20}}/>
                                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} >
                                    <ArrowDropDownCircleIcon fontSize = "small" />
                                    </IconButton>
                                    <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.AnchorEl}
                                    keepMounted
                                    open={Boolean(this.state.AnchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}> <Button href = "/signup">Edit Profile </Button></MenuItem>
                                    <MenuItem onClick={this.handleClose}> <Button href = "/sell">Sell a Book</Button></MenuItem>
                                    <MenuItem onClick={this.handleClose}> <Button href = "/buy">Buy a Book</Button></MenuItem>
                                    <MenuItem onClick={this.handleLogoutClose}> <Button href = '/login'>Logout</Button></MenuItem>
                                </Menu>
                            </Grid>
                            
                            </>)}
                        </Grid>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <Switch>
                            <Route exact path={["/", "/home"]} component={BuySellHome} />
                            <Route exact path={'/login'} component={Login} />
                            <Route exact path={'/signup'} component={Signup} />
                            <Route exact path={'/buy'} component={AllBookBuy} />
                            <Route exact path={'/sell'} component={Sell} />
                            <Route exact path={'/buyBook/:id'} component={Buy} />
                            <Route exact path={'/admin'} component={Admin} />
                            <Route exact path={'/userDetails'} component={User} />
                            <Route exact path={'/BookDetails'} component={BookDetails} />
                            <Route exact path={'/edit'} component={EditBook} />
                            <Route exact path={'/edit/:id'} component={EditBook} />
                            <Route exact path={'/pending'} component={Pending} />
                            <Route exact path={'/AddUser'} component={AddUser} />
                            <Route exact path={'/AddUser/:id'} component={AddUser} />
                        </Switch>
                    </div>
                </Router>
            </>
        )
    }
}
export default NavBar;