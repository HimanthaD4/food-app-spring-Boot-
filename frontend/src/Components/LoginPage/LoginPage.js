import React, { Component } from 'react';
import './LoginPage.css'
import Grid from '@mui/material/Grid';
import SignIN from '../SignIn/SignIN';
import SignUp from '../SignUp/SignUp';
import { useHistory } from 'react-router-dom';
import foodie from '../../images/foodies.png'
import r from '../../images/r.png'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLogin: true
         }
    }

    changeLogin = () => {
        localStorage.setItem("users","asd") 
        this.props.history.push('/');
    }

    render() { 
        return ( 
            <div className='background'>
                <Grid container>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                       <div className="loginpage__main">
                           <div>
                               <img src={r} width="450px" />
                           </div>
                          <div>
                               <div className="loginpage_rightcomponent">
                                   <img className="loginpage__logo" src={foodie} />
                                   <div className="loginPage__signin">
                                     {
                                         this.state.isLogin ? <SignIN/> : <SignUp/>
                                     }
                                        <div className="login__ordiv">
                                            <div className="login__dividor"></div>
                                            <div className="login__dividor"></div>
                                        </div>
                                        
                                          
                                   </div>
                               </div>
                           </div>
                       </div>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
         );
    }
}

export default LoginPage;
