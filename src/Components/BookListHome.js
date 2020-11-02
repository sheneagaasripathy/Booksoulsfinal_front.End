import Logo from './Logo.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Tooltip from '@material-ui/core/Tooltip';
import ListSubheader from '@material-ui/core/ListSubheader';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // marginRight:5,
    // marginLeft : 5
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: "white",
  },
  titleBar: {
  //   background:
  //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


const tileData = [
    {
      img: Logo,
      title: 'Image',
      author: 'author',
    },
    {
      img: Logo,
      title: 'Image',
      author: 'author',
    },
    {
      img: Logo,
      title: 'Image',
      author: 'author',
    },
    {
      img: Logo,
      title: 'Image',
      author: 'author',
    },
    {
      img: Logo,
      title: 'Image',
      author: 'author',
    },
];
export default function BookListHome() {
    const classes = useStyles();
    const [books, setBooks] = React.useState([]);


    useEffect(() => {
      // setBooks(["Hello"])
      // console.log("books");
      axios.get("http://localhost:8081/books/page")
        .then((Response) => {
        // console.log(Response.data.Total_No_Of_Elements)
        // setCount (Response.data.Total_No_Of_Elements)
        //console.log(Response.data.data)
        setBooks ( Response.data.data)
        // console.log(page)
        
        //console.log(Response.data.data)
        
      })
      
    },[]);
  
    return (
      
      <div className={classes.root}>
        {console.log(books)}
        <ListSubheader style = {{fontSize:18}}><strong style = {{color:"#36c2f7"}}>Recently Added Books</strong></ListSubheader>
        <GridList className={classes.gridList} cols={5}>
          {books.map((tile) => (
            <GridListTile key={tile.id}>
              <img src={tile.image[0]} alt= "Book Photo" />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>by: {tile.authorName}</span>}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <Tooltip title="Buy">
                  <Link to={`/buyBook/${tile.id}`}>
                  <IconButton>
                    <ShoppingBasketIcon className={classes.title} />
                  </IconButton>
                  </Link>
                  </Tooltip>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }