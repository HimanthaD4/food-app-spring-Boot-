import React, { Component } from 'react';
import "./SignUp.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailId : null,
            name: null,
            userName: null,
            password: null
         }
    }
    newSignUp=()=>{
    
    }

    render() { 
        return ( 
            <div>
                <input className="logipage__text" onChange={(event)=>{this.state.emailId=event.currentTarget.value;}} type="text" placeholder="Mobile number or Email" />
                <input className="logipage__text" onChange={(event)=>{this.state.name=event.currentTarget.value;}} type="text" placeholder="Full Name" />
                <input className="logipage__text" onChange={(event)=>{this.state.userName=event.currentTarget.value;}} type="text" placeholder="Username" />
                <input className="logipage__text" onChange={(event)=>{this.state.password=event.currentTarget.value;}} type="password" placeholder="Password" />
                <button className="login__button" onClick={this.newSignUp} >Sign up</button>
            </div>
         );
    }
}
 
export default SignUp;