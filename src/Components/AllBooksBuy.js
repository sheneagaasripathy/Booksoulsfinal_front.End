import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
        backgroundImage: `url("https://cdn.wallpapersafari.com/39/25/wIFT2D.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  

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


function AllBookBuy() {
    const classes = useStyles();
    const [isFilter, setIsFilter] = React.useState(false);
    const [value, setValue] = React.useState([100, 100]);
    const [category, setCategory] = React.useState('');
    const [condition, setcondition] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [books, setBooks] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [pageNo, setPageNo] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [count, setCount] = React.useState();
    const [isFiltered, setIsFiltered] = React.useState(false);
    

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
  
    const handleChangePage = (event, newPage) => {
      console.log(value[1])
        setPage(newPage);
        if(isFiltered == true){
          axios.get("http://localhost:8081/books/page/filteredpage?usage="+condition+"&category="+category+"&pageNo="+newPage+"&minPrice="+value[0]+"&maxPrice="+value[1])
          .then((Response) => {
            console.log(Response.data.Total_No_Of_Elements)
            setCount (Response.data.Total_No_Of_Elements)
            console.log(count)
            setBooks ( Response.data.data)
            console.log(page)
            console.log(books)
            //console.log(Response.data.data)
            
          })
        }
        else if(search == ''){
        axios.get("http://localhost:8081/books/page?pageSize=10&pageNo="+newPage)
        .then((Response) => {
          console.log(Response.data.Total_No_Of_Elements)
          setCount (Response.data.Total_No_Of_Elements)
          console.log(count)
          setBooks ( Response.data.data)
          console.log(page)
          console.log(books)
          //console.log(Response.data.data)
          
        })
      }else{
        axios.get("http://localhost:8081/books/page/serachedPages?serched="+search + "&pageNo="+ newPage)
        .then((Response) => {
          console.log(Response.data.Total_No_Of_Elements)
          setCount (Response.data.Total_No_Of_Elements)
          console.log(count)
          setBooks ( Response.data.data)
          console.log(page)
          console.log(books)
          //console.log(Response.data.data)
          
        })
      }
        
        
        
      };

      const filterData = () => {
        setPage(0)
        setIsFiltered(true)
        // axios.get("http://localhost:8081/books/page/filteredpage?usage=New&category=d")
        axios.get("http://localhost:8081/books/page/filteredpage?usage="+condition+"&category="+category+"&minPrice="+value[0]+"&maxPrice="+value[1])
          .then((Response) => {
            console.log(Response.data.Total_No_Of_Elements)
            setCount (Response.data.Total_No_Of_Elements)
            console.log(count)
            setBooks ( Response.data.data)
            console.log(page)
            console.log(books)
            //console.log(Response.data.data)
            
          })
      }

      const serachData = () => {
        setPage(0)
        setIsFiltered(false)
        if(search == ''){
            axios.get("http://localhost:8081/books/page?pageSize=10&pageNo=0")
            .then((Response) => {
                  setCount(Response.data.Total_No_Of_Elements)
                  setBooks( Response.data.data)
                  console.log(books)
          })
        }else{
          axios.get("http://localhost:8081/books/page/serachedPages?serched="+search + "&pageSize=10&pageNo="+ page)
          .then((Response) => {
            setCount (Response.data.Total_No_Of_Elements)
            console.log(count)
          setBooks( Response.data.data)
          console.log(books)
        })
      }
    }
    
    //   const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    //   };


    useEffect(() => {
        axios.get("http://localhost:8081/books/page?pageSize=10&pageNo=0")
          .then((Response) => {
                setCount(Response.data.Total_No_Of_Elements)
                setBooks( Response.data.data)
                console.log(books)
        })
      },[]);


    const searchUpdate = (event) => {
        setSearch(event.target.value)
    }
    const clearText = (e) => {
      setSearch ('')
      axios.get("http://localhost:8081/books/page?pageSize=10&pageNo=0")
      .then((Response) => {
            setCount(Response.data.Total_No_Of_Elements)
            setBooks( Response.data.data)
            console.log(books)
    })
  }

    // function generate(element) {
    //     return books.map((value) =>
    //       React.cloneElement(element, {
    //         ...this.value.bookName
            
            
    //       }),
    //     );
    //   }

    // const serachData = () => {
    //     if(search == null || search == ''){
    //         axios.get("http://localhost:8081/books/page?pageSize=10&pageNo="+pageNo)
    //             .then((Response) => {
    //                 setCount(Response.data.Total_No_Of_Elements)
    //                 setBooks( Response.data.data)
    //                 console.log(books)
    //     })
    //     }else{
    //     axios.get("http://localhost:8081/books/page/serachedPages?serched="+search+"&pageSize=10")
    //       .then((Response) => {
    //         setCount(Response.data.Total_No_Of_Elements)
    //         setBooks(  Response.data.data)
    //         console.log(books)
    //     })
    // }
    // }

    const handleClick = () => {
        !isFilter? (setIsFilter(true)):(setIsFilter(false))
        // setSearch('')
        
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const handleCatChange = (event) => {
        setCategory(event.target.value);
      };
    const handleConChange = (event) => {
        setcondition(event.target.value);
      };

    //   const reloadBookList = () => {
    //       console.log("Heloololololololo")
    //     BookService.fetchBooks()
    //     .then((Response) => {
    //         setBooks(Response.data)
    //     })
    // }
    return(
        <div className={classes.demo} >
             {/* <button onClick = {reloadBookList}>Hello</button> */}
            <Grid container spacing={1} >
            <Grid item xs = {1}/>
            {isFilter ? (
                <Grid item xs = {2} >
                    <Card style ={{marginTop:40}}>
                        <Paper style ={{padding:20}} class = "AllBookSellBG">
                        <h2>Filter</h2>
                            <Typography id="Price" gutterBottom>
                                Price range
                            </Typography>
                            <Slider
                                
                                max = {10000}
                                min = {100 }
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                // getAriaValueText={valuetext}
                            />
                            <br/><br/>
                            <FormControl variant="filled" style = {{width:"80%"}}>
                                <InputLabel id="Category">Category</InputLabel>
                                <Select
                                labelId="Category"
                                id="Category"
                                value={category}
                                onChange={handleCatChange}
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
                            <br/><br/>
                            <FormControl variant="filled" style = {{width:"80%"}}>
                                <InputLabel id="Condition">Condition</InputLabel>
                                <Select
                                labelId="Condition"
                                id="Condition"
                                value={condition}
                                onChange={handleConChange}
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
                            <br/><br/><br/>
                            <Button variant="outlined" type = "submit" onClick = {() => filterData()}>Find</Button>
                        </Paper>
                    </Card>
                </Grid>
            ):(
                <Grid item xs = {2}/>
            )
            }
                <Grid item xs = {8} style ={{padding:40}}>
                    <Card style ={{padding:10}} class = "AllBookSellBG" >
                        <Paper style = {{margin:5}}> 
                            <div align = "left" style = {{padding:10}}>
                            <TextField
                            onChange ={searchUpdate}
                            id="searchText"
                            label="Search for Books"
                            value= {search}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton type="submit" aria-label="search" onClick = {() => serachData()}>
                                        <SearchIcon />
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
                            <Tooltip title="Filter">
                                <IconButton onClick = {handleClick} >
                                    <FilterListIcon/>
                                </IconButton>
                            </Tooltip>
                            </div>
                            <div>
                                <h2>Books for Sale</h2>
                            </div>
                            <List >
                            {books.map((value) =>(
                                    <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                        <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        
                                        primary = {value.name}
                                        secondary= {value.authorName}
                                    />
                                    <ListItemSecondaryAction>
                                        <Link to={`/buyBook/${value.id}`}>
                                          <Button>Info</Button>
                                        </Link>
                                    </ListItemSecondaryAction>
                                    </ListItem>
                            
                            ))}
                            </List>
                            <Grid container spacing={1} 
                            direction="column"
                            alignItems="center"
                            justify="center"
                            >
                                {/* <Typography>Page: {pageNo}</Typography>
                                <Pagination count={10} page={page} onChange={handlePageChange}/> */}
                                <TablePagination
                                    rowsPerPageOptions={10}
                                    // colSpan={3}
                                    count={count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    
                                    // SelectProps={{
                                    //   inputProps: { 'aria-label': 'rows per page' },
                                    //   native: true,
                                    // }}
                                    onChangePage={handleChangePage}
                                    //onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                    />
                            </Grid>
                        </Paper>
                    </Card>
                </Grid>
                <Grid item xs = {1}/>
                </Grid>
                
          </div>
    )
}
export default AllBookBuy