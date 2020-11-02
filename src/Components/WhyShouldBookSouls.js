import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';



function WhyShouldBookSouls(){
    return(
        <>
            <h1 align = "left">Why should you sell/Buy books using Booksouls?</h1>
            <p align = "left">
                We pride ourselves in being tool that helps to the readers to buy the 
                books at the sametime help themself to earn money to buy the new book form selling old books in Booksouls, we also offer:
            </p>
            <Grid container spacing={1} >
                <Grid item xs = {4} sm = {4} style={{padding:40}}>
                    <Card style={{height:300}}>
                        <ChromeReaderModeOutlinedIcon style={{ fontSize: 30 }}/>
                        &nbsp;&nbsp;&nbsp;
                        <MenuBookOutlinedIcon style={{ fontSize: 54 }}/>
                        &nbsp;&nbsp;&nbsp;
                        <ChromeReaderModeOutlinedIcon style={{ fontSize: 30 }}/>
                        <h3 align = "left" style={{margin:20}}>Buy Books with best deals</h3>
                        <p align = "justify" style={{margin:20}}>
                            With one simple search we connect you to various sellers through our website,
                            by compairing the images of the books and their price as a book reader you know about the value so you can decide whether buy or not!
                        </p>
                    </Card>
                </Grid>
                <Grid item xs = {4} sm = {4} style={{padding:40}}>
                    <Card style={{height:300}}>
                        <ChromeReaderModeOutlinedIcon style={{ fontSize: 30 }}/>
                        &nbsp;&nbsp;&nbsp;
                        <MenuBookOutlinedIcon style={{ fontSize: 54 }}/>
                        &nbsp;&nbsp;&nbsp;
                        <ChromeReaderModeOutlinedIcon style={{ fontSize: 30 }}/>
                        <h3 align = "left" style={{margin:20}}>Safest tool with delivery system</h3>
                        <p align = "justify" style={{margin:20}}>
                            After we delivered your book if there any damage, We ensure that
                            the altanative excat the same book will given by Booksolus or your fund will be refund
                            so you can buy your books with confidence.
                        </p>
                    </Card>
                </Grid>
                <Grid item xs = {4} sm = {4} style={{padding:40}}>
                    <Card style={{height:300}}>
                        <ChromeReaderModeOutlinedIcon style={{ fontSize: 30 }}/>
                        &nbsp;&nbsp;&nbsp;
                        <MenuBookOutlinedIcon style={{ fontSize: 54 }}/>
                        &nbsp;&nbsp;&nbsp;
                        <ChromeReaderModeOutlinedIcon style={{ fontSize: 30 }}/>
                        <h3 align = "left" style={{margin:20}}>Other Buyback Resources</h3>
                        <p align = "justify" style={{margin:20}}>
                            Have questions about selling books online? 
                            Can't find the ISBN? Will your book be accepted in its current condition? 
                            Is your book counterfeit? We have many tips available whether this is your first time selling books, 
                            or if you have your own book buying business.
                        </p>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default WhyShouldBookSouls