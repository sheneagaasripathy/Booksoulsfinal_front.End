import React, { useEffect } from "react";
import { makeStyles, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead,InputAdornment, TableRow, Paper, Grid,TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import userService from "./userService";
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  grid: {
      margin: 40,
      padding: '10px 10px 10px 10px',
      backgroundColor: "black"
  },
  paper: {
    padding: '10px 10px 10px 10px', 
    margin: '10px 10px 10px 10px',
    position: 'inherit'
  },
  search: {
    position: 'relative',
    align:'left',
    },
});


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
    console.log("Page" + page)
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
    console.log("Page" + page)
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}





export default function User() {
  const classes = useStyles();
  const [user,setUser] = React.useState([]);
  const [searchString, setSearchString]= React.useState('');
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [snackbaropen, setSnackbaropen] = React.useState(false);
  const [message, setMessage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;



  const serachData = () => {
    setPage(0)
    if(searchString == ''){
      userService.getAllUsers(0)
      .then((Response) => {
        console.log(Response)
        setUser(Response.data.data)
        setCount(Response.data.Total_No_Of_Elements)
      })
    }else{
      userService.getSearchUser(searchString,0)
      .then((Response) => {
        console.log(Response)
        setUser(Response.data.data)
        setCount(Response.data.Total_No_Of_Elements)
      })
    }
  }

  const searchChange = (e) => {
    console.log(e.target.value)
    setSearchString(e.target.value)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 

const clearText = (e) => {
  setSearchString ('')
  userService.getAllUsers(0)
    .then((Response) => {
      console.log(Response)
      setUser(Response.data.data)
      setCount(Response.data.Total_No_Of_Elements)
      setPage(0);
    })
}

const handleChangePage = (event, newPage) => {
  setPage(newPage);
  if(searchString == ''){
    userService.getAllUsers(newPage)
    .then((Response) => {
      console.log(Response)
      setUser(Response.data.data)
      setCount(Response.data.Total_No_Of_Elements)
    })
}else{
  userService.getSearchUser(searchString,newPage)
    .then((Response) => {
      console.log(Response)
      setUser(Response.data.data)
      setCount(Response.data.Total_No_Of_Elements)
    })
  }
}

const fillAlert = () => {
  window.location.reload()
}

const deleteUser = (id) => {
  userService.deleteUser(id)
  .then((Response)=> {
    console.log(Response)
    setSnackbaropen(true)
    setMessage("User Deleted Sucessfully")
    setTimeout(()=> fillAlert(), 3000)
  })
}
  

  useEffect(() => {
    
    userService.getAllUsers(0)
    .then((Response) => {
      console.log(Response)
      setUser(Response.data.data)
      setCount(Response.data.Total_No_Of_Elements)
    })
    
  },[]);
  
  return (
      <div>
       <Snackbar open={snackbaropen} autoHideDuration={4000} anchorOrigin={{ vertical,horizontal }} key={vertical + horizontal}>
                <Alert severity="error">
                  {message}
                </Alert>
    </Snackbar>
    <Grid className={classes.grid} style = {{backgroundColor:"#8c8c8c",marginBottom:"7%" }} >
      <Paper className = {classes.paper}>
        <h1>User Details</h1>
        <div className={classes.search}>
            <div className={classes.searchIcon} style = {{float: 'right'}}>
            
            
            <TextField
        id="input-with-icon-textfield"
        label="Search"
        value = {searchString}
        onChange = {searchChange}
        
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick = {() => serachData()}>
                <SearchIcon/>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment : (
            <InputAdornment position="end">
              <IconButton onClick = {() => clearText()}>
                <ClearIcon/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
              
            </div>
        </div>
        
        <TableContainer>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Action</b></TableCell>
            <TableCell align="left"><b>ID</b></TableCell>
            <TableCell align="left"><b>User Name</b></TableCell>
            <TableCell align="left"><b>Email</b></TableCell>
            <TableCell align="left"><b>Address</b></TableCell>
            <TableCell align="left"><b>Phone Number</b></TableCell>
            <TableCell align="left"><b>Role</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow>
              
              <TableCell>
              <IconButton onClick = {() => deleteUser(row.id)}>
              <DeleteIcon
                color="default"
                align="left"
                inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
              />
              </IconButton>

              <Link to={`/AddUser/${row.id}`}>
              <IconButton >
                <EditIcon
                color="default"
                align="left"
                inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
              />
              </IconButton>
              </Link>

              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.phoneNum}</TableCell>
              <TableCell align="left">{row.roles[0].name}</TableCell>
            
            </TableRow>
          ))}
          
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={5}
              // colSpan={3}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              
              // SelectProps={{
              //   inputProps: { 'aria-label': 'rows per page' },
              //   native: true,
              // }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            
          </TableRow>
        </TableFooter>
      </Table>

     
    </TableContainer>

    
    
      </Paper>
    </Grid>
    </div>
  );
}