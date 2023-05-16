import React, { Component } from 'react';
import "./Home.css"
import NavBar from '../NavBar/NavBar';
import MainContent from '../MainContent/MainContent';
import CreatePost from '../CreatePost/CreatePost';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='mainE'>
                <NavBar />
               <div className='home'><CreatePost/> </div> 
                <MainContent />
            </div>
         );
    }
}
 
export default Home;


