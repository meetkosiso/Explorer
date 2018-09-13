import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Block from './../Block';
import Home from './../Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import SearchBar from 'material-ui-search-bar'
import TextField from '@material-ui/core/TextField';

class App extends Component {
  state = {
    searchfor:"",
    value: ''
  };

  navigate(url){
    window.location.href =  url;
  }

  render() {
    const { classes } = this.props;
     const {  searchfor } = this.state;
    return (
      <div className="App">
      <AppBar position="static">
           <Toolbar>
               <Typography variant="title" color="inherit">
                <a href="/" style={{ color: 'white', textDecoration:'none' }}>Bezop Explorer</a>
               </Typography>
            <SearchBar
              hintText="Search Tx Hash..."
              onChange={(newValue) => this.setState({ value: newValue })}
              onRequestSearch={() => this.navigate(`/block/${this.state.value}`)}
              style={{
                margin: '0 auto',
                maxWidth: 800,
                width: '100%',
              }}
          />
           </Toolbar>
       </AppBar>
        <div className="App-nav">
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/block" render={() => (
              <h3>Please select a blockHash.</h3>
            )}/>
            <Route path="/block/:hash" component={Block}/>
          </div>
      </Router>

        </div>
      </div>
    );
  }
}


export default App;
