import React, { Component } from 'react';
import "../LoginPage/LoginPage.css"

class SignIN extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render() { 
        return ( 
        <div>
             <button className="login__button" onClick={window.location.href="#"}>Log In</button>
        </div> 
    );
    }
}
 
export default SignIN;